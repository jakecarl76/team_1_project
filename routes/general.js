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
router.get('/add-item', isAuth, generalCtrl.getAddItem);

router.post('/add-item', isAuth, generalCtrl. postAddItem);

router.post('/add-another', isAuth, generalCtrl. postAddAnother);

router.get('/edit-item/:itemId/:itemType', isAuth, generalCtrl.getEditItem);

router.post('/edit-item', isAuth, generalCtrl.postEditItem);

router.post('/add-favorite', isAuth, generalCtrl.postAddFavorite);

// Get route: Movies
router.get('/movies', generalCtrl.getMovies);

// Get Movie Randomizer
router.get('/randomizer', /*isAuth,*/ generalCtrl.getRandomizer);

// Get route: Games
router.get('/games', generalCtrl.getGames);

// Get route: Books
router.get('/books', generalCtrl.getBooks);

// Get item details
router.get('/details/:itemId', /*isAuth,*/ generalCtrl.getItemDetails);

router.post('/add-review', isAuth, generalCtrl.submitReview);

router.post('/edit-review', isAuth, generalCtrl.getEditReview);

router.post('/update-review', isAuth, generalCtrl.updateReview);

router.post('/del-review', isAuth, generalCtrl.postDelReview);
//main index
router.get( '/', generalCtrl.getIndex);

//export router
module.exports = router;