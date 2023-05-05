/*
    The Controller acts as the intermediary between the Model and the View.
    It receives input from the user through the View, and it uses that input to update the Model.
    It also listens for changes in the Model and updates the View accordingly.
    The Controller knows about both the Model and the View, but it does not know about the specifics of their implementations.
*/
const fitnessDAO = require('../models/fitModel');
const db = new fitnessDAO();

db.init();

exports.allgoals_page = function(req, res) {
    db.getAllGoals()
        .then((list) => {
            res.render('entries', {
                'title': 'Your Goals',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.fitness_page = function(req, res) {
    db.getFitnessGoals()
        .then((list) => {
            res.render('fitness', {
                'title': 'Fitness Goals',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.lifestyle_page = function(req, res) {
    db.getLifestyleGoals()
        .then((list) => {
            res.render('lifestyle', {
                'title': 'Lifestyle Goals',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.nutrition_page = function(req, res) {
    db.getNutritionGoals()
        .then((list) => {
            res.render('nutrition', {
                'title': 'Nutrition Goals',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.completed_goals = function(req, res) {
    db.getCompletedGoals()
        .then((list) => {
            res.render('entries', {
                'title': 'Completed Goals',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.new_goals = function(req, res) {
    res.render('newgoal', {
    'title': 'New Goal'
    })
}

exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.goalName) {
        console.log('IN IF STATEMENT');
    	response.status(400).send("Entries must have an Goal Name.");
    	return;
    }
    console.log('BEFORE DB ENTRY');
    db.addEntry(req.body.goalName, req.body.description, req.body.category, req.body.startDate, req.body.endDate, req.body.complete);
    res.redirect('/');
}

exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.goalName) {
        console.log('IN IF STATEMENT');
    	response.status(400).send("Entries must have an Goal Name.");
    	return;
    }
    console.log('BEFORE DB ENTRY');
    db.addEntry(req.body.goalName, req.body.description, req.body.category, req.body.startDate, req.body.endDate, req.body.complete);
    res.redirect('/');
}
// exports.view_goal = function(req, res) {
//     db.findOne({ _id: req.params.goalName })
//     .then((list) => {
//         res.render('updategoal', {
//             'title': 'Update Goals',
//             'entries': list
//         });
//         console.log('promise resolved');
//     })
// };
