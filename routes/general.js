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
router.get('/add-item', /*isAuth,*/ generalCtrl.getAddItem);

router.post('/add-item', /*isAuth,*/ generalCtrl. postAddItem);

router.post('/add-another', /*isAuth,*/ generalCtrl. postAddAnother);

router.get('/edit-item/:itemId/:itemType', /*isAuth,*/ generalCtrl.getEditItem);

router.post('/edit-item', /*isAuth,*/ generalCtrl.postEditItem);

router.get('/my-library', /*isAuth,*/ generalCtrl.getMyLibrary);

// Get route: Movies
router.get('/movies', /*isAuth,*/ generalCtrl.getMovies);

// Get route: Games
router.get('/games', /*isAuth,*/ generalCtrl.getGames);

// Get route: Books
router.get('/books', /*isAuth,*/ generalCtrl.getBooks);

//main index
router.get( '/', generalCtrl.getIndex);

//export router
module.exports = router;