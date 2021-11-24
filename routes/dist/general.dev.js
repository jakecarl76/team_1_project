"use strict";

//import modules
var express = require('express');

var _require = require('express-validator/check'),
    body = _require.body;

var isAuth = require('../middleware/is-auth'); //import custom controllers


var generalCtrl = require('../controllers/general'); //...
//create router


var router = express.Router(); //routes

router.get('/add-item', isAuth, generalCtrl.getAddItem);
router.post('/add-item', isAuth, generalCtrl.postAddItem);
router.post('/add-another', isAuth, generalCtrl.postAddAnother);
router.get('/edit-item/:itemId/:itemType', isAuth, generalCtrl.getEditItem);
router.post('/edit-item', isAuth, generalCtrl.postEditItem);
router.post('/add-favorite', isAuth, generalCtrl.postAddFavorite); // Get route: Movies

router.get('/movies', generalCtrl.getMovies); // Get Movie Randomizer

router.get('/randomizer',
/*isAuth,*/
generalCtrl.getMovieRandomizer); // Get route: Games

router.get('/games', generalCtrl.getGames); // Get route: Books

router.get('/books', generalCtrl.getBooks); //main index

router.get('/', generalCtrl.getIndex); //export router

module.exports = router;