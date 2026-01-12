// Bring the DB connect and Trip Schema
const Mongoose = require('./db');
const Trip = require('./travlr');

//Read seed data from json file (trips)
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

//delete any existing records, then insert seed data
const seedDB = async() => {
    await Trip.deleteMany({}); //deletes all
    await Trip.insertMany(trips) //insert trips schema
};

//Close the DB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});