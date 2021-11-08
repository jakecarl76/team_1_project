//import modules
const Movie = require('../models/movie');
const Game = require('../models/game');
const Book = require('../models/book');

//import models
//...


//get index
exports.getIndex = (req, res, next) => {
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};


// NEED FIX Dummy code, delete once database content is added
const moviesObjectArray = [
  {
    title: "Eternals",
    rating: "6.8",
    genre: "Action",
    description: `The Eternals, a race of immortal beings with superhuman powers who have secretly lived on Earth for thousands of years, reunite to battle the evil Deviants.`,
    imageUrl: "images/eternals_poster.jpg"
  },
  {
    title: "Dune",
    rating: "8.2",
    genre: "Sci-Fi",
    description: `Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.`,
    imageUrl: "images/dune_poster.jpg"
  }
]

// Get All Movies and render
exports.getMovies = (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('general/movies', {
        pageTitle: 'Movies | Hermit Habitat',
        path: '/movies',
        // Swap moviesObjectArray for movies when db content is available
        movies: moviesObjectArray
      });
    });
};


// Get All Games and render
exports.getGames = (req, res, next) => {
  Game.find()
    .then(games => {
      res.render('general/games', {
        pageTitle: 'Games | Hermit Habitat',
        path: '/games',
        games: games
      });
    });
};

// Get All Books and render
exports.getBooks = (req, res, next) => {
  Book.find()
    .then(books => {
      res.render('general/books', {
        pageTitle: 'Books | Hermit Habitat',
        path: '/books',
        books: books
      });
    });
};




/*cannot test until My Items page is created*/
//get Edit Item
exports.getEditItem= (req, res, next) => {
  //Is the user in edit mode? Only allow access if in edit mode.
  const editMode = req.query.edit;

  //if not in edit mode, redirect Home
  if(!editMode){
    return res.redirect('/');
  }

  /*NEED TO ADD ITEM TYPE TO EDIT LINK ON MY ITEMS*/
  

/*NEED TO ADD ITEM ID TO EDIT LINK ON MY ITEMS*/
  //gather item id and type from params
  const itemId = req.params.itemId;
  const itemType = req.params.type;

  //locate product
  switch (itemType){
    case book:
      Book.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:book catch');
        return next(error);
      });
      break;
    case game:
      Game.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:game catch');
        return next(error);
      });
      break;
    case movie:
      Movie.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:movie catch');
        return next(error);
      });
      break;
    default:
      console.log("getEditItem case: default - Not accepted parameter.")
  }
}
  
/* used in getEditItem*/
function displayEditItem(item, itemType, res, req){
  //if no item, redirect Home
  if (!item) {
    return res.redirect('/');
  }
  //if product found, send to edit product with product info
  res.render('/edit-product', {
    pageTitle: 'Edit Item',
    path: '/edit-item',
    editing: editMode,
    itemType: itemType,
    item: item,
    hasError: false,
    user: req.user.name,
    errorMessage: "",
    validationErrors: []
  })
}