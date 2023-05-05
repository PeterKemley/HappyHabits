/*
    The Model represents the data and the business logic of the application.
    It is responsible for managing the data, retrieving and storing data,
    and applying the business rules and logic to the data. The Model does not 
    know anything about the View or the Controller, and it does not interact directly with them.
*/

const nedb = require('nedb');
class Fitness {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    init() {
        this.db.insert([
            {
                goalName: 'Lose 20kg',
                description: 'Noice',
                category: "Fitness",
                startDate: '2020-02-16',
                endDate: '2025-02-16',
                complete: "Completed",
                published: "2020-01-16"
            },
            {
                goalName: 'Gym Twice a Week',
                description: 'Noice',
                category: "Lifestyle",
                startDate: '2020-02-16',
                endDate: '2025-02-16',
                complete: "Completed",
                published: "2020-01-16"
            },
            {
                goalName: 'Eat KFC',
                description: 'Noice',
                category: "Nutrition",
                startDate: '2020-02-16',
                endDate: '2025-02-16',
                complete: "Completed",
                published: "2020-01-16"
            },
            {
                goalName: 'Gym',
                description: 'Noice',
                category: "Nutrition",
                startDate: '2020-02-16',
                endDate: '2025-02-16',
                complete: "Completed",
                published: "2020-01-16"
            },
            {
                goalName: 'Lose 20kg',
                description: 'Noice',
                category: "Fitness",
                startDate: '2020-02-16',
                endDate: '2025-02-16',
                complete: "Completed",
                published: "2020-01-16"
            },
            {
                goalName: 'Gym',
                description: 'Noice',
                category: "Nutrition",
                startDate: '2020-02-16',
                endDate: '2025-02-16',
                complete: "Completed",
                published: "2020-01-16"
            }
        ]);
    }
    
    //a function to return all entries from the database
    getAllGoals() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    getFitnessGoals() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({category: "Fitness"}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    getNutritionGoals() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({category: "Nutrition"}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    getLifestyleGoals() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({category: "Lifestyle"}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    getCompletedGoals() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({complete: "Completed"}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }
    
    addEntry(goalName, description, category, startDate, endDate, complete) {
        var entry = { 
                goalName: goalName,
                description: description,
                category: category,
                startDate: startDate,
                endDate: endDate,
                complete: complete,
                published: new Date().toISOString().split('T')[0]
                }
        console.log('entry created', entry);
        this.db.insert(entry, function(err, doc) {
                if (err) {
                    console.log('Error inserting Goal', goalName);
                    } else {
                    console.log('Goal inserted into the database', doc);
                }
        }) 
     }
}
//make the module visible outside
module.exports = Fitness;