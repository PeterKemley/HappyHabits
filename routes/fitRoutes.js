// Importing the express module and creating a router object
const express = require('express');
const router = express.Router();

// Importing the fitController module for handling requests
const controller = require('../controllers/fitController.js');

// Route for the landing page
router.get("/", controller.allgoals_page);

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
router.get('/new', controller.new_goals);
router.post('/new', controller.post_new_entry);

// Route for the deleting Goals
// router.get('/delete', controller.delete_page);
// router.post('/delete', controller.post_delete_goal);                              //FIX DELETE AND UPDATE TO COMPLETE CRUD FUNCTIONALITY

// Route for the updating Goals
// router.get('/update', controller.view_goal);

// Route for the fitness goals page
// router.get('/fitness', controller.fitness_page);
router.get('/lifestyle', controller.lifestyle_page);
router.get('/nutrition', controller.nutrition_page);

// Route for the Completed Goals page
router.get('/completed-goals', controller.completed_goals);

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