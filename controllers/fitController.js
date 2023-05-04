const fitnessDAO = require('../models/fitModel');
const db = new fitnessDAO();

db.init();

exports.landing_page = function(req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render('entries', {
                'title': 'Happy Habits',
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
    'title': 'Happy Habits'
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
    db.addEntry(req.body.goalName, req.body.description, req.body.startDate, req.body.endDate, req.body.complete);
    res.redirect('/');
}