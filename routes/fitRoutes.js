// Importing the express module and creating a router object
const express = require('express');
const router = express.Router();
const flash = require('express-flash')
router.use(flash())
// Importing the fitController module for handling requests
const controller = require('../controllers/fitController.js');

// Route for the landing page
router.get('/', function(req, res) {
    res.render('index');
})

// Route for the landing page
router.get("/home", controller.allgoals_page);

// Route for the landing page
router.get("/allgoals", controller.allgoals_page);

// Route for the login page
router.get('/login', function(req, res) {
    res.render('login', { title: 'Login' });
})

router.get('/register', function(req, res) {
    res.render('register', { title: 'Register' });
})

// Route for redirecting to the about.html page
router.get('/about', function(req, res) {
    res.render('about', { title: 'About' });
})

// Route for the new entry page
// Route for the fitness goals page
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('user authenticated');
      next();
    } else {
      console.log('user not authenticated');
      req.flash('error', 'Please login to access this page.');
      res.redirect("/login");
    }
  }

router.get('/new', controller.new_goals);
router.post('/new', controller.post_new_entry);

router.get('/fitness', checkAuthenticated, controller.fitness_page)
router.get('/lifestyle', checkAuthenticated, controller.lifestyle_page);
router.get('/nutrition', checkAuthenticated, controller.nutrition_page);
router.get('/completed-goals', checkAuthenticated, controller.completed_goals);
router.get('/notcompleted-goals', checkAuthenticated, controller.notcompleted_goals);

// (req, res) => {
//     if (req.isAuthenticated()) {
//         console.log('user authenticated');
//         router.get('/fitness', controller.fitness_page);
//     } else {
//         console.log('user not authenticated');
//         res.redirect("/login")// MAKE A HOMEPAGE
//     }
//   })

// Route for handling 404 errors
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

// Route for handling internal server errors
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

module.exports = router;