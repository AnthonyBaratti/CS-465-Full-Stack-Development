const mongoose = require ('mongoose');
const User = require('../models/user');
const passport = require('passport');


//Register New User
const register = async(req, res) => {
    //Validate message to esure that all parameters are met
    if (!req.body.name || !req.body.email || !req.body.password){
        return res
        .status(400)
        .json({"message": "All fields required"});
    }

    const user = new User({
            name: req.body.name,    //set user name
            email: req.body.email,  //set user email
            password: ''            //Initialize with empty password
        });
    
    user.setPassword(req.body.password); //set User Password
    const q = await user.save();

    if (!q) {
        //Database returned no data
        return res
        .status(400)
        .json(err);
    }
    else {
        //Return new user token
        const token = user.generateJWT();
        return res
        .status(200)
        .json(token);
    }
};


//User Login
const login = (req, res) => {
    //Validate email and password are present
    if (!req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({"message": "All fields required"});
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
            .status(404)
            .json(err);
        }
        if (user) { //success, generate JWT and return it
            const token = user.generateJWT();
            res
            .status(200)
            .json({token});
        }
        else {
            res
            .status(401)
            .json(info);
        }
    }) (req, res);
};

module.exports = {
    register,
    login
};