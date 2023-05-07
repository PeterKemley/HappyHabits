/*
  This code block checks if the current environment is not "production" and if so,
  loads environment variables from a .env file into process.env using the dotenv package.
  It is commonly used in development environments to avoid hardcoding sensitive information such as API keys etc.
  In our case its for a Session Key
*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Importing the express module and creating an express application
const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const controller = require('./controllers/fitController.js');

// Import the initializePassport function from passport-config.js
const initializePassport = require('./passport-config')
// Initialize passport by passing the passport object and two callback functions for finding a user by email and by id
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

// Importing the path module and setting a variable for the path to the public folder
const path = require('path');
const public = path.join(__dirname,'public');

// Using the express.static middleware to serve the static files in the public folder
app.use(express.static(public));

// Importing the body-parser module and configuring it to parse urlencoded bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

// Importing the mustache-express module and configuring the view engine to use mustache
const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Importing the fitRoutes module and using it as middleware
const router = require('./routes/fitRoutes');
// This middleware sets the authenticated variable and user name variable on 
app.use(function(req, res, next) {
  res.locals.authenticated = req.isAuthenticated();
  res.locals.name = req.user ? req.user.name : null;
  next();
});

/* This is a route for the entry point of the web application. 
If the user is authenticated, it will render the index page.
Otherwise, it will redirect to the login page*/
app.get('/', (req, res) => {
  console.log('Entry Point');
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    res.redirect("/login")// MAKE A HOMEPAGE
  }
})

// GET '/home' - renders the 'index' view if the user is authenticated, otherwise redirects to the login page
app.get('/home', (req, res) => {
  res.render('index')
})

// GET '/login' - renders the 'login' view if the user is not authenticated, otherwise redirects to the home page
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

// POST '/login' - authenticates the user using Passport.js and redirects to the 'index' page if successful, otherwise redirects to the login page with a flash message
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// GET '/register' - renders the 'register' view if the user is not authenticated, otherwise redirects to the home page
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
})

// POST '/register' - creates a new user in the 'users' array and redirects to the login page if successful, otherwise redirects to the register page
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch (err){
      console.log('Registration Failed')
      console.error(err)
      req.flash('error', 'Error registering user. Please try again.');
      res.render('register')
    }
})

// DELETE '/logout' - logs the user out and redirects to the login page
app.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
});
// This function checks if a user is authenticated or not. If the user is authenticated, it allows access to the requested page.
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    // If the user is not authenticated, it sets a flash message and redirects to the login page.
    req.flash('error', 'Please login to access this page.');
    res.redirect('/login')
}
// This function checks if a user is not authenticated. If the user is not authenticated, it allows access to the requested page.
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    // If the user is authenticated, it allows the user to proceed to the requested page.
    next()
}

app.use('/', router); 

//IF RUNNING LOCALHOST PORT WILL BE 3000 but if hosted it will be the env variable AUTO SET BY HEROKU
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}. Ctrl+C to stop running.`);
});

/*
In summary, this is an index.js file for an Express application that serves static files 
from the public folder, parses urlencoded form data using body-parser, uses the mustache-express 
template engine, and uses the fitRoutes module for routing. The server is started on port 3000 
and a console message is printed to indicate that the server is running.
*/
