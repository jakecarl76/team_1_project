"use strict";

function _templateObject6() {
  var data = _taggedTemplateLiteral(["favorites 1: ", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["favorites (getMyLibrary): ", ""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

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
}; // Get All Movies and render


exports.getMovies = function (req, res, next) {
  Movie.find().then(function (movies) {
    res.render('general/movies', {
      pageTitle: 'Movies | Hermit Habitat',
      path: '/movies',
      content: movies
    });
  });
}; // Get All Games and render


exports.getGames = function (req, res, next) {
  Game.find().then(function (games) {
    res.render('general/games', {
      pageTitle: 'Games | Hermit Habitat',
      path: '/games',
      content: games
    });
  });
}; // Get All Books and render


exports.getBooks = function (req, res, next) {
  Book.find().then(function (books) {
    res.render('general/books', {
      pageTitle: 'Books | Hermit Habitat',
      path: '/books',
      content: books
    });
  });
}; // Get Movie Randomizer


exports.getMovieRandomizer = function (req, res, next) {
  // Get genre from query
  var movieGenre = req.query.genre; // Find all movies

  Movie.find().then(function (movies) {
    var genreIteration = []; // Push all movie genre to array

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = movies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _movie = _step.value;
        genreIteration.push(_movie.genre);
      } // Filter movie genre to have unique values

    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var genre = genreIteration.filter(function (value, index) {
      return genreIteration.indexOf(value) === index;
    }); // Display different results if genre is in URL query

    if (movieGenre) {
      // Get random movie from mongodb based on genre
      Movie.aggregate([{
        $match: {
          genre: movieGenre
        }
      }, {
        $sample: {
          size: 1
        }
      }]).then(function (mov) {
        res.render('general/randomizer', {
          pageTitle: 'Movie Randomizer | Hermit Habitat',
          path: '/randomizer',
          genre: movieGenre,
          genres: genre,
          movie: mov[0],
          hasMovie: true
        });
      });
    } else {
      res.render('general/randomizer', {
        pageTitle: 'Movie Randomizer | Hermit Habitat',
        path: '/randomizer',
        content: movies,
        genres: genre,
        hasMovie: false
      });
    }

    ;
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
    user: req.user,
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
      var _movie3 = new Movie({
        title: title,
        genre: genre,
        rating: rating,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });

      _movie3.save().then(function (result) {
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

exports.postAddFavorite = function (req, res, next) {
  var user = req.user;
  var itemType = req.body.itemType.toString();
  var id = req.body.id.toString();
  var msg;
  User.findById(user).then(function (user) {
    //is it already in Favorites?
    switch (itemType) {
      case "book":
        if (!user.bookLib.favorites.includes(id)) {
          user.bookLib.favorites.push(id);
          msg = "Book added to bookLib.favorites.";
        } else {
          var index = user.bookLib.favorites.findIndex(function (index) {
            return index == id;
          });
          console.log("index: ".concat(index));
          user.bookLib.favorites.splice(index, 1);
          msg = "Book removed from bookLib.favorites.";
        }

        user.save().then(function (results) {
          console.log(msg);
          console.log("".concat(user.username, ".bookLib: ").concat(user.bookLib));
        })["catch"](function (err) {
          var error = new Error(err);
          error.httpStatusCode = 500;
          console.log('postAddFavorites user.save (book) error: ${err}');
          return next(error);
        });
        res.redirect('/my-library#books');
        break;

      case "movie":
        if (!user.movieLib.favorites.includes(id)) {
          user.movieLib.favorites.push(id);
          console.log("Movie added to movieLib.favorites");
        } else {
          var _index = user.movieLib.favorites.findIndex(function (index) {
            return index == id;
          });

          user.movieLib.favorites.splice(_index, 1);
          msg = "Movie removed from movieLib.favorites.";
        }

        user.save().then(function (results) {
          console.log("".concat(user.username, ".movieLib: ").concat(user.movieLib));
        })["catch"](function (err) {
          var error = new Error(err);
          error.httpStatusCode = 500;
          console.log('postAddFavorites user.save (movie) error: ${err}');
          return next(error);
        });
        res.redirect('/my-library#movies');
        break;

      case "game":
        if (!user.gameLib.favorites.includes(id)) {
          user.gameLib.favorites.push(id);
          msg = "Game added to gameLib.favorites.";
        } else {
          var _index2 = user.gameLib.favorites.findIndex(function (index) {
            return index == id;
          });

          user.gameLib.favorites.splice(_index2, 1);
          msg = "Game removed from gameLib.favorites.";
        }

        user.save().then(function (results) {
          console.log(msg);
          console.log("".concat(user.username, ".gameLib: ").concat(user.gameLib));
        })["catch"](function (err) {
          var error = new Error(err);
          error.httpStatusCode = 500;
          console.log('postAddFavorites user.save (game) error: ${err}');
          return next(error);
        });
        res.redirect('/my-library#games');
        break;

      default:
    }
  });
}; //THIS ISN'T DONE- YOU NEED TO PULL WHAT'S IN THE LIBRARY, NOT WHAT THEY'VE CREATED!


exports.getMyLibrary = function _callee4(req, res, next) {
  var bookList, movieList, gameList, favorites, user;
  return regeneratorRuntime.async(function _callee4$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          bookList = [];
          movieList = [];
          gameList = [];
          favorites = [];
          user = req.user;
          console.log(_templateObject5(), favorites);
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
                gameList = games;
                User.findById(user).then(function (user) {
                  console.log("in getFavorites!");
                  var faveBooks = user.bookLib.favorites;
                  var faveMovies = user.movieLib.favorites;
                  var faveGames = user.gameLib.favorites;
                  var title, genre, img, item, type, id;
                  Book.find({
                    _id: {
                      $in: faveBooks
                    }
                  }).then(function (books) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = books[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var book = _step2.value;
                        title = book.title;
                        genre = book.genre;
                        img = book.imageUrl;
                        type = "book";
                        id = book._id;
                        item = {
                          type: type,
                          title: title,
                          genre: genre,
                          imageUrl: img,
                          id: id
                        };
                        favorites.push(item);
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                          _iterator2["return"]();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }

                    console.log("getFavorites book.find loop complete");
                    Movie.find({
                      _id: {
                        $in: faveMovies
                      }
                    }).then(function (movies) {
                      var _iteratorNormalCompletion3 = true;
                      var _didIteratorError3 = false;
                      var _iteratorError3 = undefined;

                      try {
                        for (var _iterator3 = movies[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                          var _movie4 = _step3.value;
                          title = _movie4.title;
                          genre = _movie4.genre;
                          img = _movie4.imageUrl;
                          type = "movie";
                          id = _movie4._id;
                          item = {
                            type: type,
                            title: title,
                            genre: genre,
                            imageUrl: img,
                            id: id
                          };
                          favorites.push(item);
                        }
                      } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                      } finally {
                        try {
                          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                            _iterator3["return"]();
                          }
                        } finally {
                          if (_didIteratorError3) {
                            throw _iteratorError3;
                          }
                        }
                      }

                      console.log("getFavorites movie.find loop complete");
                      Game.find({
                        _id: {
                          $in: faveGames
                        }
                      }).then(function (games) {
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                          for (var _iterator4 = games[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _game3 = _step4.value;
                            title = _game3.title;
                            genre = _game3.category;
                            img = _game3.imageUrl;
                            type = "game";
                            id = _game3._id;
                            item = {
                              type: type,
                              title: title,
                              genre: genre,
                              imageUrl: img,
                              id: id
                            };
                            favorites.push(item);
                          }
                        } catch (err) {
                          _didIteratorError4 = true;
                          _iteratorError4 = err;
                        } finally {
                          try {
                            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                              _iterator4["return"]();
                            }
                          } finally {
                            if (_didIteratorError4) {
                              throw _iteratorError4;
                            }
                          }
                        }

                        console.log("getFavorites game.find loop complete");
                        console.log(_templateObject6(), favorites); //render the page using those items

                        res.render('admin/my-library', {
                          books: bookList,
                          movies: movieList,
                          games: gameList,
                          favorites: favorites,
                          pageTitle: 'My Library',
                          path: '/my-library',
                          user: req.user
                        });
                      });
                    })["catch"](function (err) {
                      var error = new Error(err);
                      error.httpStatusCode = 500;
                      console.log('getMyLibrary 1086');
                      return next(error);
                    });
                  })["catch"](function (err) {
                    var error = new Error(err);
                    error.httpStatusCode = 500;
                    console.log('getMyLibrary 1093');
                    return next(error);
                  });
                })["catch"](function (err) {
                  var error = new Error(err);
                  error.httpStatusCode = 500;
                  console.log('getMyLibrary 1100');
                  return next(error);
                });
              });
            });
          })["catch"](function (err) {
            var error = new Error(err);
            error.httpStatusCode = 500;
            console.log('getMyLibrary 1109');
            return next(error);
          });

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
};