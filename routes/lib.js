//import modules
const express = require('express');
const {body} = require('express-validator/check');
const isAuth = require('../middleware/is-auth');
//import custom controllers
const libCtrl = require('../controllers/lib');
//...

//create router
const router = express.Router();

//routes
//...
router.get('/my-library', isAuth, libCtrl.getMyLibrary);

router.post('/adjust-library', isAuth, libCtrl.postAdjustLibrary);

//
//router.get( '', libCtrl.getIndex);

//export router
module.exports = router;