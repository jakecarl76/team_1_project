"use strict";

//import modules
var express = require('express');

var _require = require('express-validator/check'),
    body = _require.body;

var isAuth = require('../middleware/is-auth'); //import custom controllers


var libCtrl = require('../controllers/lib'); //...
//create router


var router = express.Router(); //routes
//...

router.get('/my-library', isAuth, libCtrl.getMyLibrary);
router.post('/adjust-library', isAuth, libCtrl.postAdjustLibrary); //
//router.get( '', libCtrl.getIndex);
//export router

module.exports = router;