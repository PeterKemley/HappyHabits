// Importing the express module and creating an express application
const express = require('express');
const app = express();

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

// Importing the fitRoutes module and using it as middleware
const router = require('./routes/fitRoutes');
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
