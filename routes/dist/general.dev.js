"use strict";

//import modules
var express = require('express');

var _require = require('express-validator/check'),
    body = _require.body;

var isAuth = require('../middleware/is-auth'); //import custom controllers


var generalCtrl = require('../controllers/general'); //...
//create router


var router = express.Router(); //routes

router.get('/add-item',
/*isAuth,*/
generalCtrl.getAddItem);
router.get('/edit-item/:itemId',
/*isAuth,*/
generalCtrl.getEditItem); //main index

router.get('/', generalCtrl.getIndex); //export router

module.exports = router;