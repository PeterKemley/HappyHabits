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

const initializePassport = require('./passport-config')
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

app.get('/', checkAuthenticated, (req, res) => {
    res.render('entries', { name: req.user.name })
  })

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/index', checkAuthenticated, (req, res) => {
    res.render('index', { name: req.user.name })
  })

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
})

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
    } catch {
      res.redirect('/register')
    }
})

app.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
});
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}

app.use('/', router); 

// Starting the server and listening on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl+C to stop running.');
})

/*
In summary, this is an index.js file for an Express application that serves static files 
from the public folder, parses urlencoded form data using body-parser, uses the mustache-express 
template engine, and uses the fitRoutes module for routing. The server is started on port 3000 
and a console message is printed to indicate that the server is running.
*/
