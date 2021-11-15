"use strict";

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Error getGenres-Movie ", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Error getGenres-Book ", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["postAddItem- image: ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["postAddItem- image: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import models
var Book = require('../models/book');

var Movie = require('../models/movie');

var Game = require('../models/game');

var User = require('../models/user');

var bookGenres = [];
var movieGenres = [];
var gameCategories = []; //get index

exports.getIndex = function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('general/index', {
            pageTitle: "Welcome to the Entertainment Library!",
            path: '/'
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAddItem = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getBookGenres());

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(getMovieGenres());

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(getCategories());

        case 6:
          console.log("bookGenres: ".concat(bookGenres, "; movieGenres: ").concat(movieGenres, "; categories: ").concat(gameCategories));
          res.render('admin/edit-item', _defineProperty({
            pageTitle: 'Add Item',
            path: '/add-item',
            editing: false,
            user: req.user.username,
            itemType: null,
            item: null,
            bookGenres: bookGenres,
            movieGenres: movieGenres,
            categories: gameCategories,
            errorMessage: [],
            hasError: false,
            validationErrors: []
          }, "categories", gameCategories));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // NEED FIX Dummy code, delete once database content is added


var moviesObjectArray = [{
  title: "The Eternals",
  rating: "6.8 / 10",
  genre: "Action",
  description: "The Eternals, a race of immortal beings with superhuman powers who have secretly lived on Earth for thousands of years, reunite to battle the evil Deviants.",
  imageUrl: "images/eternals_poster.jpg"
}, {
  title: "Dune",
  rating: "8.2 / 10",
  genre: "Sci-Fi",
  description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.",
  imageUrl: "images/dune_poster.jpg"
}, {
  title: "The Suicide Squad",
  rating: "7.3 / 10",
  genre: "Action",
  description: "The government sends the most dangerous supervillains in the world -- Bloodsport, Peacemaker, King Shark, Harley Quinn and others -- to the remote, enemy-infused island of Corto Maltese. Armed with high-tech weapons, they trek through the dangerous jungle on a search-and-destroy mission, with only Col. Rick Flag on the ground to make them behave.",
  imageUrl: "images/thesuicidesquad_poster.jpg"
}]; // Get All Movies and render

exports.getMovies = function (req, res, next) {
  Movie.find().then(function (movies) {
    res.render('general/movies', {
      pageTitle: 'Movies | Hermit Habitat',
      path: '/movies',
      // Swap moviesObjectArray for movies when db content is available
      content: moviesObjectArray
    });
  });
}; // NEED FIX Dummy code, delete once database content is added


var gamesObjectArray = [{
  title: "The Settlers of Catan",
  category: "Strategy, Negotiation",
  description: "The players in the game represent settlers establishing settlements on the island of Catan. Players build settlements, cities, and roads to connect them as they settle the island. ... On each player's turn, two six-sided dice are rolled to determine which hexes produce resources.",
  imageUrl: "images/catan.jpg"
}, {
  title: "One Night Ultimate Werewolf",
  category: "Party, Strategy",
  description: "One Night Ultimate Werewolf Daybreak is a fast game for 3-7 players where everyone gets a role: The cunning Alpha Wolf, the powerful Witch, the helpful Apprentice Seer, or others, each with a special ability. In the course of a single morning, your village will decide who among them is a werewolf. because all it takes is finding one werewolf to win!",
  imageUrl: "images/ultimatewerewolf.jpg"
}, {
  title: "7 Wonders",
  category: "Strategy",
  description: "7 Wonders is a card drafting game that is played using three decks of cards featuring depictions of ancient civilizations, military conflicts, and commercial activity. The game is highly regarded, being one of the highest rated games on the board game discussion website BoardGameGeek.",
  imageUrl: "images/7wonders.jpg"
}]; // Get All Games and render

exports.getGames = function (req, res, next) {
  Game.find().then(function (games) {
    res.render('general/games', {
      pageTitle: 'Games | Hermit Habitat',
      path: '/games',
      // Swap gamesObjectArray for games when db content is available
      content: gamesObjectArray
    });
  });
}; // NEED FIX Dummy code, delete once database content is added


var booksObjectArray = [{
  title: "Atomic Habits",
  author: "James Clear",
  genre: "Self-Improvement",
  description: "Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.",
  imageUrl: "images/atomichabits.jpg"
}, {
  title: "To Kill A Mockingbird",
  author: "Harper Lee",
  genre: "Fiction",
  description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic. Today it is regarded as a masterpiece of American literature.",
  imageUrl: "images/mockingbird.jpg"
}, {
  title: "The Da Vinci Code",
  author: "Dan Brown",
  genre: "Thriller",
  description: "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci\u2014clues visible for all to see and yet ingeniously disguised by the painter.",
  imageUrl: "images/thedavincicode.jpg"
}]; // Get All Books and render

exports.getBooks = function (req, res, next) {
  Book.find().then(function (books) {
    res.render('general/books', {
      pageTitle: 'Books | Hermit Habitat',
      path: '/books',
      // Swap booksObjectArray for books when db content is available
      content: booksObjectArray
    });
  });
};
/*cannot test until My Items page is created*/
// link to add for edit item: "edit-item/6189b7e12defcea0f68bdc6b/game"
//get Edit Item


exports.getEditItem = function _callee3(req, res, next) {
  var editMode, itemId, itemType;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getBookGenres());

        case 2:
          _context3.next = 4;
          return regeneratorRuntime.awrap(getMovieGenres());

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(getCategories());

        case 6:
          //Is the user in edit mode? Only allow access if in edit mode.
          editMode = true; //req.query.edit;
          //if not in edit mode, redirect Home

          if (editMode) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.redirect('/'));

        case 9:
          //gather item id and type from params
          itemId = req.params.itemId;
          itemType = req.params.itemType.toString(); //locate product

          _context3.t0 = itemType;
          _context3.next = _context3.t0 === "book" ? 14 : _context3.t0 === game ? 16 : _context3.t0 === movie ? 18 : 20;
          break;

        case 14:
          Book.findById(itemId).then(function (item) {
            displayEditItem(item, itemType, editMode, res, req);
          })["catch"](function (err) {
            var error = new Error(err);
            error.httpStatusCode = 500;
            console.log("getEditItem case:book catch; item: ".concat(item));
            return next(error);
          });
          return _context3.abrupt("break", 22);

        case 16:
          Game.findById(itemId).then(function (item) {
            displayEditItem(item, itemType, editMode, res, req);
          })["catch"](function (err) {
            var error = new Error(err);
            error.httpStatusCode = 500;
            console.log("getEditItem case:game catch; item: ".concat(item));
            return next(error);
          });
          return _context3.abrupt("break", 22);

        case 18:
          Movie.findById(itemId).then(function (item) {
            displayEditItem(item, itemType, editMode, res, req);
          })["catch"](function (err) {
            var error = new Error(err);
            error.httpStatusCode = 500;
            console.log("getEditItem case:movie catch; item: ".concat(item));
            return next(error);
          });
          return _context3.abrupt("break", 22);

        case 20:
          displayEditItem();
          console.log("getEditItem case: default - Not accepted parameter. itemType: ".concat(itemType));

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  });
};
/* used in getEditItem*/


function displayEditItem(item, itemType, editMode, res, req) {
  //if no item, redirect Home
  if (!item) {
    console.log("NO ITEM TO DISPLAY");
    return res.redirect('/');
  } //if product found, send to edit product with product info


  res.render('admin/edit-item', {
    pageTitle: 'Edit Item',
    path: '/edit-item',
    editing: editMode,
    itemType: itemType,
    item: item,
    bookGenres: bookGenres,
    movieGenres: movieGenres,
    categories: gameCategories,
    hasError: false,
    //user: req.user.name,    Uncomment out once user login working
    errorMessage: "",
    validationErrors: []
  });
}

exports.postAddItem = function (req, res, next) {
  //gather the info from the form
  var itemType = req.body.itemType;
  var title = req.body.title;
  var author = req.body.author;
  var bookGenre = req.body.bookGenre;
  var movieGenre = req.body.movieGenre;
  var rating = req.body.rating;
  var category = req.body.category;
  var image = req.file;
  var description = req.body.description;
  var newBookGenre = req.body.newBookGenre;
  var newMovieGenre = req.body.newMovieGenre;
  var newCategory = req.body.newCategory; //if it's a new book genre, make it genre

  if (bookGenre == "newGenre") {
    bookGenre = newBookGenre;
  } //if it's a new movie genre, make it genre


  if (movieGenre == "newGenre") {
    movieGenre = newMovieGenre;
  } //if it's a new category, make it category


  if (category == "newCategory") {
    category = newCategory;
  } //image validation


  if (!image) {
    return res.status(422).render('admin/edit-item', {
      pageTitle: 'Add Item',
      path: '/add-item',
      editing: false,
      user: req.user.username,
      isAuthenticated: false,
      errorMessage: 'Attached file is not a supported image type.',
      hasError: true,
      itemType: itemType,
      item: {
        title: title,
        author: author,
        genre: genre,
        rating: rating,
        category: category,
        description: description
      },
      validationErrors: []
    });
  } // *** NEED TO ADD VALIDATION, THEN CAN UNCOMMENT THIS OUT
  //form validation
  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //   console.log`Error: postAddItem errors[] - ${errors.array()}`;
  //   return res.status(422).render('admin/edit-item', {
  //     pageTitle: 'Add Item',
  //     path: '/add-item',
  //     editing: false,
  //     hasError: true,
  //     // user: req.user.name,      Uncomment out once login implemented
  //     isAuthenticated: false,
  //     errorMessage: errors.array()[0].msg,
  //     product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
  //     validationErrors: errors.array()
  //   })
  // }


  var imageUrl = image.filename;
  console.log(_templateObject(), image); //save item based on type

  switch (itemType) {
    case "book":
      var book = new Book({
        title: title,
        author: author,
        genre: genre,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });
      book.save().then(function (result) {
        //log success and redirect to admin products
        console.log('Created Book');
        res.redirect('/my-library');
      })["catch"](function (err) {
        console.log("postAddItem - switch(book) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {
            title: title,
            author: author,
            genre: genre,
            rating: rating,
            category: category,
            description: description
          },
          validationErrors: errors.array()
        });
      });
      break;

    case "movie":
      var _movie = new Movie({
        title: title,
        genre: genre,
        rating: rating,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });

      _movie.save().then(function (result) {
        //log success and redirect to admin products
        console.log('Created Movie');
        res.redirect('/my-library');
      })["catch"](function (err) {
        console.log("postAddProduct - switch(movie) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {
            title: title,
            author: author,
            genre: genre,
            rating: rating,
            category: category,
            description: description
          },
          validationErrors: errors.array()
        });
      });

      break;

    case "game":
      var _game = new Game({
        title: title,
        category: category,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });

      _game.save().then(function (result) {
        //log success and redirect to admin products
        getCategories();
        console.log('Created Game');
        res.redirect('/my-library');
      })["catch"](function (err) {
        console.log("postAddProduct - switch(game) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {
            title: title,
            author: author,
            genre: genre,
            rating: rating,
            category: category,
            description: description
          },
          validationErrors: errors.array()
        });
      });

      break;

    default:
      console.log("postAddProduct - switch(default): ".concat(itemType));
      return res.status(422).render('admin/edit-product', {
        pageTitle: 'Add Item',
        path: '/add-item',
        editing: false,
        user: req.user.username,
        isAuthenticated: false,
        errorMessage: [],
        hasError: false,
        product: {
          title: title,
          author: author,
          genre: genre,
          rating: rating,
          category: category,
          description: description
        },
        validationErrors: []
      });
  }
};

exports.postAddAnother = function (req, res, next) {
  //gather the info from the form
  var itemType = req.body.itemType;
  var title = req.body.title;
  var author = req.body.author;
  var genre = req.body.genre;
  var rating = req.body.rating;
  var category = req.body.category;
  var image = req.file;
  var description = req.body.description;
  var newGenre = req.body.newGenre;
  var newCategory = req.body.newCategory; //if it's a new genre, make it genre

  if (genre == "newGenre") {
    genre = newGenre;
  } //if it's a new category, make it category


  if (category == "newCategory") {
    category = newCategory;
  } //image validation


  if (!image) {
    return res.status(422).render('admin/edit-item', {
      pageTitle: 'Add Item',
      path: '/add-item',
      editing: false,
      user: req.user.username,
      isAuthenticated: false,
      errorMessage: 'Attached file is not a supported image type.',
      hasError: true,
      itemType: itemType,
      item: {
        title: title,
        author: author,
        genre: genre,
        rating: rating,
        category: category,
        description: description
      },
      validationErrors: []
    });
  } // *** NEED TO ADD VALIDATION, THEN CAN UNCOMMENT THIS OUT
  //form validation
  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //   console.log`Error: postAddItem errors[] - ${errors.array()}`;
  //   return res.status(422).render('admin/edit-item', {
  //     pageTitle: 'Add Item',
  //     path: '/add-item',
  //     editing: false,
  //     hasError: true,
  //     // user: req.user.name,      Uncomment out once login implemented
  //     isAuthenticated: false,
  //     errorMessage: errors.array()[0].msg,
  //     product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
  //     validationErrors: errors.array()
  //   })
  // }


  var imageUrl = image.filename;
  console.log(_templateObject2(), image); //save item based on type

  switch (itemType) {
    case "book":
      var book = new Book({
        title: title,
        author: author,
        genre: genre,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });
      book.save().then(function (result) {
        //log success and redirect to admin products
        console.log('Created Book');
        res.redirect('/add-item');
      })["catch"](function (err) {
        console.log("postAddItem - switch(book) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {
            title: title,
            author: author,
            genre: genre,
            rating: rating,
            category: category,
            description: description
          },
          validationErrors: errors.array()
        });
      });
      break;

    case "movie":
      var _movie2 = new Movie({
        title: title,
        genre: genre,
        rating: rating,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });

      _movie2.save().then(function (result) {
        //log success and redirect to admin products
        console.log('Created Movie');
        res.redirect('/add-item');
      })["catch"](function (err) {
        console.log("postAddProduct - switch(movie) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {
            title: title,
            author: author,
            genre: genre,
            rating: rating,
            category: category,
            description: description
          },
          validationErrors: errors.array()
        });
      });

      break;

    case "game":
      var _game2 = new Game({
        title: title,
        category: category,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });

      _game2.save().then(function (result) {
        //log success and redirect to admin products
        getCategories();
        console.log('Created Game');
        res.redirect('/add-item');
      })["catch"](function (err) {
        console.log("postAddProduct - switch(game) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {
            title: title,
            author: author,
            genre: genre,
            rating: rating,
            category: category,
            description: description
          },
          validationErrors: errors.array()
        });
      });

      break;

    default:
      console.log("postAddProduct - switch(default): ".concat(itemType));
      return res.status(422).render('admin/edit-product', {
        pageTitle: 'Add Item',
        path: '/add-item',
        editing: false,
        user: req.user.username,
        isAuthenticated: false,
        errorMessage: [],
        hasError: false,
        product: {
          title: title,
          author: author,
          genre: genre,
          rating: rating,
          category: category,
          description: description
        },
        validationErrors: []
      });
  }
};

exports.postEditItem = function (req, res, next) {
  //gather updated product info
  var itemId = req.body.itemId;
  var itemType = req.body.itemType;
  var updatedTitle = req.body.title;
  var updatedAuthor = req.body.author;
  var updatedBookGenre = req.body.bookGenre;
  var updatedMovieGenre = req.body.movieGenre;
  var updatedRating = req.body.rating;
  var updatedCategory = req.body.category;
  var image = req.file;
  var updatedDescription = req.body.description;
  var newBookGenre = req.body.newBookGenre;
  var newMovieGenre = req.body.newMovieGenre;
  var newCategory = req.body.newCategory;
  console.log("postEditItem updatedBookGenre: ".concat(updatedBookGenre)); //if it's a new book genre, make it genre

  if (updatedBookGenre == "newGenre") {
    updatedBookGenre = newBookGenre;
  } //if it's a new movie genre, make it genre


  if (updatedMovieGenre == "newGenre") {
    updatedMovieGenre = newMovieGenre;
  } //if it's a new category, make it category


  if (updatedCategory == "newCategory") {
    category = newCategory;
  } // *** Need to add validation
  //check for validation errors
  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //   return res.status(422).render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: true,
  //     product: {
  //       title: updatedTitle,
  //       price: updatedPrice,
  //       description: updatedDesc
  //     },
  //     isAuthenticated: req.session.isLoggedIn,
  //     hasError: true,
  //     errorMessage: errors.array()[0].msg
  //   });
  // }
  //locate existing product in db


  switch (itemType) {
    case "book":
      Book.findById(itemId).then(function (book) {
        if (book.userId.toString() !== req.user._id.toString()) {
          return res.redirect('/');
        } //update book details


        book.title = updatedTitle;
        book.author = updatedAuthor;
        book.genre = updatedBookGenre;
        book.description = updatedDescription;

        if (image) {
          book.imageUrl = image.filename;
        }

        return book.save().then(function (result) {
          //log the success and redirect to admin products  
          console.log('UPDATED BOOK!');
          res.redirect('/my-library');
        })["catch"](function (err) {
          res.redirect('/my-library');
          console.log("postEditItem - book - Err: ".concat(err));
        });
      })["catch"](function (err) {
        //res.redirect('/admin/edit-product/:itemId');
        var error = new Error(err);
        error.httpStatusCode = 500;
        console.log('postEditItem - book - Err: ${err}');
        return next(error);
      });
      break;

    case "movie":
      Movie.findById(itemId).then(function (movie) {
        if (movie.userId.toString() !== req.user._id.toString()) {
          return res.redirect('/');
        } //update movie details


        movie.title = updatedTitle;
        movie.rating = updatedRating;
        movie.genre = updatedMovieGenre;
        movie.description = updatedDescription;

        if (image) {
          movie.imageUrl = image.filename;
        }

        return movie.save().then(function (result) {
          //log the success and redirect to admin products  
          console.log('UPDATED MOVIE!');
          res.redirect('/my-library');
        })["catch"](function (err) {
          res.redirect('/my-library');
          console.log("postEditItem - movie - Err: ".concat(err));
        });
      })["catch"](function (err) {
        //res.redirect('/admin/edit-product/:itemId');
        var error = new Error(err);
        error.httpStatusCode = 500;
        console.log('postEditItem - movie - Err: ${err}');
        return next(error);
      });
      break;

    case "game":
      Game.findById(itemId).then(function (game) {
        if (game.userId.toString() !== req.user._id.toString()) {
          return res.redirect('/');
        } //update game details


        game.title = updatedTitle;
        game.category = updatedCategory;
        game.description = updatedDescription;

        if (image) {
          game.imageUrl = image.filename;
        }

        return game.save().then(function (result) {
          //log the success and redirect to admin products  
          console.log('UPDATED GAME!');
          res.redirect('/my-library');
        })["catch"](function (err) {
          res.redirect('/my-library');
          console.log("postEditItem - game - Err: ".concat(err));
        });
      })["catch"](function (err) {
        //res.redirect('/admin/edit-product/:itemId');
        var error = new Error(err);
        error.httpStatusCode = 500;
        console.log('postEditItem - game - Err: ${err}');
        return next(error);
      });
      break;

    default:
      console.log("postEditItem - switch(default): ".concat(itemType));
      return res.status(422).render('admin/edit-product', {
        pageTitle: 'Edit Item',
        path: '/edit-item',
        editing: true,
        user: req.user.username,
        isAuthenticated: false,
        errorMessage: [],
        hasError: false,
        product: {
          title: title,
          author: author,
          genre: genre,
          rating: rating,
          category: category,
          description: description
        },
        validationErrors: []
      });
  }
};

function getBookGenres() {
  return regeneratorRuntime.async(function getBookGenres$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Book.find().distinct("genre").then(function (genres) {
            var genresLength = genres.length;

            for (var i = 0; i < genresLength; i++) {
              if (!bookGenres.includes(genres[i])) {
                bookGenres.push(genres[i]);
              }
            }
          })["catch"](function (err) {
            console.log(_templateObject3(), err);
          }));

        case 2:
          return _context4.abrupt("return");

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getMovieGenres() {
  return regeneratorRuntime.async(function getMovieGenres$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Movie.find().distinct("genre").then(function (genres) {
            var genresLength = genres.length;

            for (var i = 0; i < genresLength; i++) {
              if (!movieGenres.includes(genres[i])) {
                movieGenres.push(genres[i]);
              }
            }
          })["catch"](function (err) {
            console.log(_templateObject4(), err);
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getCategories() {
  return regeneratorRuntime.async(function getCategories$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Game.find().distinct("category").then(function (categories) {
            gameCategories = categories;
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}

exports.getMyLibrary = function (req, res, next) {
  var bookList = [];
  var movieList = [];
  var gameList = [];
  Book.find({
    userId: req.user._id
  }).then(function (books) {
    bookList = books;
    Movie.find({
      userId: req.user._id
    }).then(function (movies) {
      movieList = movies;
      Game.find({
        userId: req.user._id
      }).then(function (games) {
        gameList = games; //render the page using those items

        res.render('admin/my-library', {
          books: bookList,
          movies: movieList,
          games: gameList,
          pageTitle: 'My Library',
          path: '/my-library',
          user: req.user.name
        });
      });
    });
  })["catch"](function (err) {
    var error = new Error(err);
    error.httpStatusCode = 500;
    console.log('admin-controller 20');
    return next(error);
  });
};

exports.postAddFavorite = function (req, res, next) {
  var user = req.user;
  var itemType = req.body.itemType.toString();
  var id = req.body.id.toString();
  User.findById(user).then(function (user) {
    //is it already in Favorites?
    switch (itemType) {
      case "book":
        if (!user.bookLib.favorites.includes(id)) {
          user.bookLib.favorites.push(id);
          user.save().then(function (results) {
            console.log("Book added to bookLib.favorites");
            console.log("".concat(user.username, ".bookLib: ").concat(user.bookLib));
          })["catch"](function (err) {
            var error = new Error(err);
            error.httpStatusCode = 500;
            console.log('postAddFavorites user.save (book) error: ${err}');
            return next(error);
          });
        } // res.redirect('/my-library');


        break;

      case "movie":
        if (!user.movieLib.favorites.includes(id)) {
          user.movieLib.favorites.push(id);
          user.save().then(function (results) {
            console.log("Movie added to movieLib.favorites");
            console.log("".concat(user.username, ".movieLib: ").concat(user.movieLib));
          })["catch"](function (err) {
            var error = new Error(err);
            error.httpStatusCode = 500;
            console.log('postAddFavorites user.save (movie) error: ${err}');
            return next(error);
          });
        } // res.redirect('/my-library');


        break;

      case "game":
        if (!user.gameLib.favorites.includes(id)) {
          user.gameLib.favorites.push(id);
          user.save().then(function (results) {
            console.log("Game added to gameLib.favorites");
            console.log("".concat(user.username, ".gameLib: ").concat(user.gameLib));
          })["catch"](function (err) {
            var error = new Error(err);
            error.httpStatusCode = 500;
            console.log('postAddFavorites user.save (game) error: ${err}');
            return next(error);
          });
        } // res.redirect('/my-library');


        break;

      default:
    }
  });
};