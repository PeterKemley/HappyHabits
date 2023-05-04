// Importing the express module and creating a router object
const express = require('express');
const router = express.Router();

// Importing the fitController module for handling requests
const controller = require('../controllers/fitController.js');

// Route for the landing page
router.get("/", controller.landing_page);

// Route for redirecting to the about.html page
router.get('/about', function(req, res) {
    res.render('about', { title: 'About' });
})

// Route for the new entry page
router.get('/new', controller.new_goals);
router.post('/new', controller.post_new_entry);

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