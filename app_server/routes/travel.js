//////////////////////////////
// travel.js
// Anthony Baratti
// SNHU CS-465 FSD I
// Professor T. Butler
//
//
//////////////////////////////

var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');

/* GET travel page */
router.get('/', controller.travel);

module.exports = router;