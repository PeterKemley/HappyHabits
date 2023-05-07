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
              goalName: 'Eat 5 servings of fruits and vegetables daily',
              description: 'Aim to eat at least 5 servings of fruits and vegetables every day for better health.',
              category: 'Nutrition',
              startDate: '2022-05-01',
              endDate: '2022-05-31',
              complete: 'Not Yet Completed',
              published: '2022-04-30'
            },
            {
              goalName: 'Reduce sugar intake',
              description: 'Limit added sugars to less than 10% of daily calorie intake.',
              category: 'Nutrition',
              startDate: '2022-06-01',
              endDate: '2022-06-30',
              complete: 'Completed',
              published: '2022-05-31'
            },
            {
              goalName: 'Try a new healthy recipe each week',
              description: 'Experiment with new recipes to find healthier options that you enjoy.',
              category: 'Nutrition',
              startDate: '2022-07-01',
              endDate: '2022-07-31',
              complete: 'Not Yet Completed',
              published: '2022-06-30'
            },
            {
              goalName: 'Spend more time outdoors',
              description: 'Make a conscious effort to spend more time outside and in nature.',
              category: 'Lifestyle',
              startDate: '2022-05-01',
              endDate: '2022-05-31',
              complete: 'Completed',
              published: '2022-04-30'
            },
            {
              goalName: 'Meditate for 10 minutes daily',
              description: 'Set aside 10 minutes each day to practice mindfulness and meditation.',
              category: 'Lifestyle',
              startDate: '2022-06-01',
              endDate: '2022-06-30',
              complete: 'Not Yet Completed',
              published: '2022-05-31'
            },
            {
              goalName: 'Practice yoga twice a week',
              description: 'Incorporate yoga into your fitness routine by practicing twice a week.',
              category: 'Lifestyle',
              startDate: '2022-07-01',
              endDate: '2022-07-31',
              complete: 'Completed',
              published: '2022-06-30'
            },
            {
              goalName: 'Run a 5K in under 30 minutes',
              description: 'Train to run a 5K race and aim to finish in under 30 minutes.',
              category: 'Fitness',
              startDate: '2022-05-01',
              endDate: '2022-05-31',
              complete: 'Not Yet Completed',
              published: '2022-04-30'
            },
            {
              goalName: 'Strength train twice a week',
              description: 'Incorporate strength training into your fitness routine by lifting weights twice a week.',
              category: 'Fitness',
              startDate: '2022-06-01',
              endDate: '2022-06-30',
              complete: 'Not Yet Completed',
              published: '2022-05-31'
            },
            {
              goalName: 'Increase flexibility',
              description: 'Incorporate stretching and yoga into your routine to increase flexibility.',
              category: 'Fitness',
              startDate: '2022-07-01',
              endDate: '2022-07-31',
              complete: 'Not Yet Completed',
              published: '2022-06-30'
            },
            {
                goalName: 'Meditate for 10 minutes daily',
                description: 'Practice daily mindfulness and relaxation',
                category: 'Lifestyle',
                startDate: '2022-01-01',
                endDate: '2022-12-31',
                complete: 'Not Yet Completed',
                published: '2022-01-01'
              },
              {
                goalName: 'Drink 2 liters of water daily',
                description: 'Improve hydration and overall health',
                category: 'Nutrition',
                startDate: '2022-01-01',
                endDate: '2022-12-31',
                complete: 'Not Yet Completed',
                published: '2022-01-01'
              },
              {
                goalName: 'Run a 10k',
                description: 'Train and participate in a 10k race',
                category: 'Fitness',
                startDate: '2022-01-01',
                endDate: '2022-06-30',
                complete: 'Not Yet Completed',
                published: '2022-01-01'
              },
              {
                goalName: 'Read 20 books',
                description: 'Expand knowledge and improve reading habit',
                category: 'Lifestyle',
                startDate: '2022-01-01',
                endDate: '2022-12-31',
                complete: 'Not Yet Completed',
                published: '2022-01-01'
              },
              {
                goalName: 'Eat a salad every day for a month',
                description: 'Improve nutrition and increase vegetable intake',
                category: 'Nutrition',
                startDate: '2022-05-01',
                endDate: '2022-05-31',
                complete: 'Not Yet Completed',
                published: '2022-05-01'
              },
              {
                goalName: 'Do 100 push-ups in a day',
                description: 'Build strength and endurance',
                category: 'Fitness',
                startDate: '2022-01-01',
                endDate: '2022-06-30',
                complete: 'Not Yet Completed',
                published: '2022-01-01'
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
    //a function to return all fitness entries from the database
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
    //a function to return all nutrition entries from the database
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
    //a function to return all lifestyle entries from the database
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
    //a function to return all completed entries from the database
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
    //a function to return all non completed entries from the database
    getNotCompletedGoals() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({complete: "Not Yet Completed"}, function(err, entries) {
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
    //a function to add a goal entry to the database
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
     //a function to delete a goal entry in the database
     deleteGoal(_id) {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
          //use the remove() function of the database to delete the data,
          //error first callback function, err for error, numRemoved for number of records deleted
          this.db.remove({ _id: id }, function(err, numRemoved) {
            //if error occurs reject Promise
            if (err) {
              reject(err);
            //if no error resolve the promise & return the data
            } else {
              resolve(numRemoved);
              //to see what the returned data looks like
              console.log('function remove() returns: ', numRemoved);
            }
          })
        })
      }
}
//make the module visible outside
module.exports = Fitness;