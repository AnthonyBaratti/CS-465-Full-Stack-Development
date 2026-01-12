const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register Model
const Model = mongoose.model('trips');
const User = require('../models/user');

// Helper: Get authenticated user
const getUser = async (req, res, callback) => {
    if (req.payload && req.payload.email) {
      try {
        const user = await User.findOne({ email: req.payload.email }).exec();
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        callback(req, res, user.name);
  
      } catch (err) {
        console.error('Error in getUser:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized: No user payload' });
    }
  };

// GET: /trips - List all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving trips', error: err });
  }
};

// GET: /trips/:tripCode - Get a trip by code
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model.findOne({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving trip', error: err });
  }
};

// POST: /trips - Add new trip
const tripsAddTrip = (req, res) => {
    //Uses JWT for authentication via getUser call
  getUser(req, res, async (req, res) => {
    try {
      const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      });

      const savedTrip = await newTrip.save();
      return res.status(201).json(savedTrip);
    } catch (err) {
      return res.status(400).json({ message: 'Error saving trip', error: err });
    }
  });
};

// PUT: /trips/:tripCode - Update existing trip
const tripsUpdateTrip = (req, res) => {
    //Uses JWT for authentication via getUser call
  getUser(req, res, async (req, res) => {
    try {
      const updatedTrip = await Model.findOneAndUpdate(
        { code: req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description,
        },
        { new: true }
      ).exec();

      if (!updatedTrip) {
        return res.status(404).json({ message: 'Trip not found or not updated' });
      }

      return res.status(200).json(updatedTrip);
    } catch (err) {
      return res.status(500).json({ message: 'Error updating trip', error: err });
    }
  });
};

// DELETE: /trips/:tripCode - Delete a trip
const tripsDeleteTrip = (req, res) => {
    //Uses JWT to authenticate user via getUser call
  getUser(req, res, async (req, res) => {
    try {
      const result = await Model.findOneAndDelete({ code: req.params.tripCode }).exec();

      if (!result) {
        return res.status(404).json({ message: `Trip with code ${req.params.tripCode} not found.` });
      }

      return res.status(200).json({ message: `Trip ${req.params.tripCode} successfully deleted.` });
    } catch (err) {
      console.error('Error deleting trip:', err);
      return res.status(500).json({ error: 'Internal server error while deleting trip.' });
    }
  });
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};