//import modules
const express = require('express');
const {body} = require('express-validator/check');

//import custom controllers
const libCtrl = require('../controllers/auth');
//...




//create router
const router = express.Router();

//routes
//...


//
//router.get( '', libCtrl.getIndex);

//export router
module.exports = router;