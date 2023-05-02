// Importing the express module and creating a router object
const express = require('express');
const router = express.Router();

// Importing the fitController module for handling requests
const controller = require('../controllers/fitController.js');

// Route for the landing page
router.get("/", controller.landing_page);

// Route for the guestbook entries list page
router.get('/guestbook', controller.entries_list);

// Route for redirecting to the about.html page
router.get('/about', function(req, res) {
    res.redirect('/about.html');
})

// Route for the entries by Peter page
router.get('/peter', controller.peters_entries);

// Route for the new entry page
router.get('/new', controller.new_entries);

// Route for handling new entry form submissions
router.post('/new', controller.post_new_entry);

// Route for displaying entries by a specific author
router.get('/posts/:author', controller.show_user_entries);

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

// Exporting the router object for use in other modules
module.exports = router;

/*
In summary, this routes.js file exports a router object that defines several routes
for handling different HTTP requests. The routes use methods from the fitController
module to handle the request and generate a response. There are routes for displaying
the landing page, the guestbook entries list page, entries by Peter, and entries by a specific author. 
There are also routes for displaying the new entry form and handling form submissions. Finally, there 
are routes for handling 404 errors and internal server errors.
*/