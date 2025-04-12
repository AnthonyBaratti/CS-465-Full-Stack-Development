const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register Model
const Model = mongoose.model('trips');

//GET: /trips -lists all the trips
// Regardless of outcome, response must include HTML 
// status code and JSON message to the
// requesting Client

const tripsList = async(req, res) => {
    const q = await Model
    .find({}) // No filter, returns all records
    .exec();

    //Uncomment next line to show results of query in console
    //console.log(q);

    if(!q) { //No data returned
    return res.status(404).json(err);    
    }
    else { //Return found trip list
        return res.status(200).json(q);
    }
};

module.exports = {
    tripsList
};

//GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include
// HTML status code & JSON message to 
// the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Model
    .find({'code' : req.params.tripCode}) // Returns single record
    .exec();

    //Uncomment for log message result
    //console.log(q);

    if(!q) { //No data
        return res
            .status(404)
            .json(err);    
    }

    else { //data found
        return res
            .status(200)
            .json(q);
    }
};

//POST: /trips - Adds a new Trip
// Regardless of outcome, response must inlude
// HTML status code and JSON message
// to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q) {
            //database returned no data
            return res
                .stats(400)
                .json(err);
        }
        else {
            //return new trip
            return res.status(201).json(q);
        }
};

// PUT: /trips/:tripCode - Adds a new Trip 
// Regardless of outcome, response must include HTML status 
// and JSON message to the requesting client 
const tripsUpdateTrip = async(req, res) => { 
 
    // Uncomment for debugging 
    console.log(req.params); 
    console.log(req.body); 
 
    const q = await Model 
        .findOneAndUpdate( 
            { 'code' : req.params.tripCode }, 
            { 
                code: req.body.code, 
                name: req.body.name, 
                length: req.body.length, 
                start: req.body.start, 
                resort: req.body.resort, 
                perPerson: req.body.perPerson, 
                image: req.body.image, 
                description: req.body.description 
            }  
        ) 
        .exec(); 
         
        if(!q) 
        { // Database returned no data 
            return res 
                .status(400) 
                .json(err); 
 
        } else { // Return resulting updated trip 
            return res 
                .status(201) 
                .json(q); 
        }     
                
        // Uncomment the following line to show results of operation 
        // on the console 
        // console.log(q); 
}; 

module.exports = {
    tripsList,
    tripsFindByCode, // additional endpoint
    tripsAddTrip,
    tripsUpdateTrip
};