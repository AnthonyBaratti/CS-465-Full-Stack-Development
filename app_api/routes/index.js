const express = require("express");
const router = express.Router();

//This is where we import the controllers we will route
const tripsController = require ('../controllers/trips');


router
    .route("/trips")
    .get(tripsController.tripsList) //Get method Routes tripList
    .post(tripsController.tripsAddTrip); //POST method Adds a Trip

//Get method routes tripsFindByCode - requires parameter
// PUT method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip)
    .delete(tripsController.tripsDeleteTrip);

module.exports = router;