//import modules
const express = require('express');
const {body} = require('express-validator/check');
const isAuth = require('../middleware/is-auth');
//import custom controllers
const generalCtrl = require('../controllers/general');
//...




//create router
const router = express.Router();

//routes
//...
router.get('/edit-item/:itemId', /*isAuth,*/ generalCtrl.getEditItem);

//main index
router.get( '/', generalCtrl.getIndex);

//export router
module.exports = router;