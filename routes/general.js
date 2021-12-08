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
router.post('/delete-item', isAuth, generalCtrl.postDelItem);

router.get('/add-item', isAuth, generalCtrl.getAddItem);

router.post('/add-item',
 body('itemType')
 .custom( (value, {req}) => {
   if(value == 'book')
   {
     //check author given for book
     if(req.body.author == '')
     {
       throw new Error("You must give the author of the book");
     }

     //check genre selected
     if(req.body.bookGenre == undefined)
     {
       throw new Error("You must select a genre for the book");
     }
     else if( req.body.bookGenre == "newGenre" && req.body.newBookGenre == "")
     {
       throw new Error("If you want to add a new genre for books, you must enter the name of the new genre")
     }

   }//END IF BOOK
   else if(value == 'movie')
   {
     //check genre selected
     if(req.body.movieGenre == undefined)
     {
       throw new Error("You must select a genre for the movie");
     }
     else if( req.body.movieGenre == "newGenre" && req.body.newMovieGenre == "")
     {
       throw new Error("If you want to add a new genre for movies, you must enter the name of the new genre")
     }

     //check rating set
     if(req.body.rating == undefined)
     {
       throw new Error("You must select a rating for the movie");
     }
   }//END MOVIE
   else if(value == 'game')
   {
     //check genre selected
     if(req.body.category == undefined)
     {
       throw new Error("You must select a category for the game");
     }
     else if( req.body.category == "newCategory" && req.body.newCategory == "")
     {
       throw new Error("If you want to add a new category for games, you must enter the name of the new category")
     }
   }
   return true;
 }),
 body('title')
 .notEmpty()
 .withMessage('You must fill in a title'),
 body('description')
 .notEmpty()
 .withMessage('You must give a description'),
 isAuth, 
 generalCtrl. postAddItem);

router.post('/add-another',
body('itemType')
.custom( (value, {req}) => {
  if(value == 'book')
  {
    //check author given for book
    if(req.body.author == '')
    {
      throw new Error("You must give the author of the book");
    }

    //check genre selected
    if(req.body.bookGenre == undefined)
    {
      throw new Error("You must select a genre for the book");
    }
    else if( req.body.bookGenre == "newGenre" && req.body.newBookGenre == "")
    {
      throw new Error("If you want to add a new genre for books, you must enter the name of the new genre")
    }

  }//END IF BOOK
  else if(value == 'movie')
  {
    //check genre selected
    if(req.body.movieGenre == undefined)
    {
      throw new Error("You must select a genre for the movie");
    }
    else if( req.body.movieGenre == "newGenre" && req.body.newMovieGenre == "")
    {
      throw new Error("If you want to add a new genre for movies, you must enter the name of the new genre")
    }

    //check rating set
    if(req.body.rating == undefined)
    {
      throw new Error("You must select a rating for the movie");
    }
  }//END MOVIE
  else if(value == 'game')
  {
    //check genre selected
    if(req.body.category == undefined)
    {
      throw new Error("You must select a category for the game");
    }
    else if( req.body.category == "newCategory" && req.body.newCategory == "")
    {
      throw new Error("If you want to add a new category for games, you must enter the name of the new category")
    }
  }
  return true;
}),
body('title')
.notEmpty()
.withMessage('You must fill in a title'),
body('description')
.notEmpty()
.withMessage('You must give a description'),
isAuth, 
generalCtrl.postAddAnother);

router.get('/edit-item/:itemId/:itemType', isAuth, generalCtrl.getEditItem);

router.post('/edit-item',
body('itemType')
.custom( (value, {req}) => {
  if(value == 'book')
  {
    //check author given for book
    if(req.body.author == '')
    {
      throw new Error("You must give the author of the book");
    }

    //check genre selected
    if(req.body.bookGenre == undefined)
    {
      throw new Error("You must select a genre for the book");
    }
    else if( req.body.bookGenre == "newGenre" && req.body.newBookGenre == "")
    {
      throw new Error("If you want to add a new genre for books, you must enter the name of the new genre")
    }

  }//END IF BOOK
  else if(value == 'movie')
  {
    //check genre selected
    if(req.body.movieGenre == undefined)
    {
      throw new Error("You must select a genre for the movie");
    }
    else if( req.body.movieGenre == "newGenre" && req.body.newMovieGenre == "")
    {
      throw new Error("If you want to add a new genre for movies, you must enter the name of the new genre")
    }

    //check rating set
    if(req.body.rating == undefined)
    {
      throw new Error("You must select a rating for the movie");
    }
  }//END MOVIE
  else if(value == 'game')
  {
    //check genre selected
    if(req.body.category == undefined)
    {
      throw new Error("You must select a category for the game");
    }
    else if( req.body.category == "newCategory" && req.body.newCategory == "")
    {
      throw new Error("If you want to add a new category for games, you must enter the name of the new category")
    }
  }
  return true;
}),
body('title')
.notEmpty()
.withMessage('You must fill in a title'),
body('description')
.notEmpty()
.withMessage('You must give a description'), 
isAuth, 
generalCtrl.postEditItem);

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