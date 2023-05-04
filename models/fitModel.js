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
        this.db.insert({
            goalName: 'Lose 20kg',
            description: 'Noice',
            startDate: '2020-02-16',
            endDate: '2025-02-16',
            complete: "true",
            published: "2020-01-16"
        });
        //for later debugging
        console.log('db entry Peter inserted');
        }
    
    //a function to return all entries from the database
    getAllEntries() {
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
    
    addEntry(goalName, description, startDate, endDate, complete) {
        var entry = { 
                goalName: goalName,
                description: description,
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