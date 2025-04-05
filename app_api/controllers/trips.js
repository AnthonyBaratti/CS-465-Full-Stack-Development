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

module.exports = {
    tripsList,
    tripsFindByCode // additional endpoint
};