const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); //Enable JSON web tokens

// Method to authenticate our JWT 
function authenticateJWT(req, res, next) { 
    // console.log('In Middleware'); 
 
    const authHeader = req.headers['authorization']; 
    console.log('Auth Header: ' + authHeader); 
 
    if(authHeader == null) 
    { 
        console.log('Auth Header Required but NOT PRESENT!'); 
        return res.sendStatus(401); 
    } 
 
    let headers = authHeader.split(' '); 
    if(headers.length < 1) 
    { 
        console.log('Not enough tokens in Auth Header: ' + 
headers.length); 
        return res.sendStatus(501); 
    } 
 
    const token = authHeader.split(' ')[1]; 
    console.log('Token: ' + token); 
 
    if(token == null) 
    { 
        console.log('Token missing from header'); 
        return res.sendStatus(401); 
    } 
 
    console.log(process.env.JWT_SECRET); 
    console.log(jwt.decode(token)); 
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => { 
        if(err) 
        { 
            console.log('Token verification failed', err);
            return res.sendStatus(401).json('Token Validation Error!'); 
        }  
        console.log('Token verified, payload: ', verified)
        req.payload = verified; // Set the payload paramto the decoded object 
        next(); // We need to continue or this will hang forever 
    }); 
    
} 

//This is where we import the controllers we will route
const tripsController = require ('../controllers/trips');
const authController = require("../controllers/authentication");

//routers for log in and register
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router
    .route("/trips")
    .get(tripsController.tripsList) //Get method Routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip); //POST method Adds a Trip

//Get method routes tripsFindByCode - requires parameter
// PUT method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;