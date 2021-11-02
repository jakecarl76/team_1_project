//import modules
const express = require('express');
const {body} = require('express-validator/check');

//import custom controllers
const generalCtrl = require('../controllers/general');
//...




//create router
const router = express.Router();

//routes
//...


//main index
router.get( '/', generalCtrl.getIndex);

//export router
module.exports = router;