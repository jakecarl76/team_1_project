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
var _require = require('express-validator/check'),
    validationResult = _require.validationResult; //import models


var Book = require('../models/book');

var Movie = require('../models/movie');

var Game = require('../models/game');

var User = require('../models/user');

var Review = require('../models/review');

var bookGenres = [];
var movieGenres = [];
var gameCategories = [];
var defaultBookImg = "default-book-image.png";
var defaultMovieImg = "default-movie-image.png";
var defaultGameImg = "default-game-image.png";
var ITEMS_PER_PAGE = 20; //get index

exports.getIndex = function _callee(req, res, next) {
  var bookList, movieList, gameList, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // res.render('general/index', {
          //   pageTitle: "Welcome to the Entertainment Library!",
          //   path: '/'
          // });
          bookList = [];
          movieList = [];
          gameList = [];
          user = req.user;

          if (!user) {
            user = {
              bookLib: {
                favorites: [],
                lib: []
              },
              gameLib: {
                favorites: [],
                lib: []
              },
              movieLib: {
                favorites: [],
                lib: []
              }
            };
          }

          Book.find().limit(10).then(function (books) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = books[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var book = _step.value;
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
                bookList.push(item);
              }
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

            console.log("getIndex- books loop complete");
            Movie.find().limit(10).then(function (movies) {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = movies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var movie = _step2.value;
                  title = movie.title;
                  genre = movie.genre;
                  img = movie.imageUrl;
                  type = "movie";
                  id = movie._id;
                  item = {
                    type: type,
                    title: title,
                    genre: genre,
                    imageUrl: img,
                    id: id
                  };
                  movieList.push(item);
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

              console.log("getIndex- movie loop complete");
              Game.find().limit(10).then(function (games) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = games[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var game = _step3.value;
                    title = game.title;
                    genre = game.category;
                    img = game.imageUrl;
                    type = "game";
                    id = game._id;
                    item = {
                      type: type,
                      title: title,
                      genre: genre,
                      imageUrl: img,
                      id: id
                    };
                    gameList.push(item);
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

                console.log("getIndex- game loop complete"); //render the page using those items

                res.render('general/index', {
                  books: bookList,
                  movies: movieList,
                  games: gameList,
                  pageTitle: 'Hermit Habitat',
                  path: '/',
                  user: user
                });
              })["catch"](function (err) {
                var error = new Error(err);
                error.httpStatusCode = 500;
                console.log('getIndex - games catch');
                return next(error);
              });
            })["catch"](function (err) {
              var error = new Error(err);
              error.httpStatusCode = 500;
              console.log('getIndex - movie catch');
              return next(error);
            });
          })["catch"](function (err) {
            var error = new Error(err);
            error.httpStatusCode = 500;
            console.log('getIndex - books catch');
            return next(error);
          });

        case 6:
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
  var page = parseInt(req.query.page);
  var totalItems;

  if (!page) {
    page = 1;
  }

  var user = null;

  if (req.user) {
    user = req.user;
  }

  Movie.find().countDocuments().then(function (numOfMovies) {
    totalItems = numOfMovies;
    return Movie.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
  }).then(function (movies) {
    res.render('general/movies', {
      pageTitle: 'Movies | Hermit Habitat',
      path: '/movies',
      content: movies,
      user: user,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
  })["catch"](function (err) {
    var error = new Error(err);
    error.httpStatusCode = 500;
    console.log('getMovies catch');
    return next(error);
  });
}; // Get All Games and render


exports.getGames = function (req, res, next) {
  var page = parseInt(req.query.page);
  var totalItems;

  if (!page) {
    page = 1;
  }

  var user = null;

  if (req.user) {
    user = req.user;
  }

  Game.find().countDocuments().then(function (numOfGames) {
    totalItems = numOfGames;
    return Game.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
  }).then(function (games) {
    res.render('general/games', {
      pageTitle: 'Games | Hermit Habitat',
      path: '/games',
      content: games,
      user: user,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
  })["catch"](function (err) {
    var error = new Error(err);
    error.httpStatusCode = 500;
    console.log('getGames catch');
    return next(error);
  });
}; // Get All Books and render


exports.getBooks = function (req, res, next) {
  var page = parseInt(req.query.page);
  var totalItems;

  if (!page) {
    page = 1;
  }

  var user = null;

  if (req.user) {
    user = req.user;
  }

  Book.find().countDocuments().then(function (numOfBooks) {
    totalItems = numOfBooks;
    return Book.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
  }).then(function (books) {
    res.render('general/books', {
      pageTitle: 'Books | Hermit Habitat',
      path: '/books',
      content: books,
      user: user,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
  })["catch"](function (err) {
    var error = new Error(err);
    error.httpStatusCode = 500;
    console.log('getBooks catch');
    return next(error);
  });
}; // Get Randomizer


exports.getRandomizer = function (req, res, next) {
  // Get randomizer type from query
  var type = req.query.type; // Get genre from query

  var contentGenre = req.query.genre;

  switch (type) {
    case 'movie':
      // Find all movies
      Movie.find().then(function (movies) {
        var genreIteration = []; // Push all movie genre to array

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = movies[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var movie = _step4.value;
            genreIteration.push(movie.genre);
          } // Filter movie genre to have unique values

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

        var genre = genreIteration.filter(function (value, index) {
          return genreIteration.indexOf(value) === index;
        }); // Display different results if genre is in URL query

        if (contentGenre) {
          // Get random movie from mongodb based on genre
          Movie.aggregate([{
            $match: {
              genre: contentGenre
            }
          }, {
            $sample: {
              size: 1
            }
          }]).then(function (mov) {
            res.render('general/randomizer', {
              pageTitle: 'Movie Randomizer | Hermit Habitat',
              path: '/randomizer',
              genre: contentGenre,
              genres: genre,
              content: mov[0],
              hasMovie: true,
              random_home: false,
              type: type
            });
          });
        } else {
          res.render('general/randomizer', {
            pageTitle: 'Movie Randomizer | Hermit Habitat',
            path: '/randomizer',
            genres: genre,
            hasMovie: false,
            random_home: false,
            type: type,
            type_name: 'Movie'
          });
        }

        ;
      });
      break;

    case 'game':
      // Find all movies
      Game.find().then(function (games) {
        var genreIteration = []; // Push all movie genre to array

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = games[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var game = _step5.value;
            genreIteration.push(game.category);
          } // Filter movie genre to have unique values

        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        var genre = genreIteration.filter(function (value, index) {
          return genreIteration.indexOf(value) === index;
        }); // Display different results if genre is in URL query

        if (contentGenre) {
          // Get random movie from mongodb based on genre
          Game.aggregate([{
            $match: {
              category: contentGenre
            }
          }, {
            $sample: {
              size: 1
            }
          }]).then(function (gam) {
            res.render('general/randomizer', {
              pageTitle: 'Game Randomizer | Hermit Habitat',
              path: '/randomizer',
              genre: contentGenre,
              genres: genre,
              content: gam[0],
              hasMovie: true,
              random_home: false,
              type: type
            });
          });
        } else {
          res.render('general/randomizer', {
            pageTitle: 'Game Randomizer | Hermit Habitat',
            path: '/randomizer',
            genres: genre,
            hasMovie: false,
            random_home: false,
            type: type,
            type_name: 'Game'
          });
        }

        ;
      });
      break;

    default:
      res.render('general/randomizer', {
        pageTitle: 'Movie Randomizer | Hermit Habitat',
        path: '/randomizer',
        hasMovie: false,
        random_home: true,
        type: type
      });
      break;
  }
}; // Get Item Details


exports.getItemDetails = function (req, res, next) {
  var itemId = req.params.itemId;
  var type = req.query.type;

  switch (type) {
    case 'movie':
      Movie.findById(itemId).then(function (movie) {
        Review.find({
          contentId: itemId
        }).then(function (reviews) {
          if (req.user) {
            //set filter to get only user's reviews, or all reviews if
            //user is admin/moderator
            var tmpFilter = {
              userId: null || req.user._id,
              contentId: itemId
            };

            if (req.user.adminStatus == "isAdmin" || req.user.adminStatus == "isModerator") {
              tmpFilter = {
                contentId: itemId
              };
            }

            Review.find(tmpFilter).then(function (userReviews) {
              res.render('general/details', {
                pageTitle: "".concat(movie.title, " | Hermit Habitat"),
                path: '/details',
                item: movie,
                user: req.user,
                type: type,
                reviews: reviews,
                your_reviews: userReviews
              });
            });
          } else {
            res.render('general/details', {
              pageTitle: "".concat(movie.title, " | Hermit Habitat"),
              path: '/details',
              item: movie,
              user: req.user,
              type: type,
              reviews: reviews,
              your_reviews: null
            });
          }
        });
      });
      break;

    case 'book':
      Book.findById(itemId).then(function (book) {
        Review.find({
          contentId: itemId
        }).then(function (reviews) {
          if (req.user) {
            //set filter to get only user's reviews, or all reviews if
            //user is admin/moderator
            var tmpFilter = {
              userId: null || req.user._id,
              contentId: itemId
            };

            if (req.user.adminStatus == "isAdmin" || req.user.adminStatus == "isModerator") {
              tmpFilter = {
                contentId: itemId
              };
            }

            Review.find(tmpFilter).then(function (userReviews) {
              res.render('general/details', {
                pageTitle: "".concat(book.title, " | Hermit Habitat"),
                path: '/details',
                item: book,
                user: req.user,
                type: type,
                reviews: reviews,
                your_reviews: userReviews
              });
            });
          } else {
            res.render('general/details', {
              pageTitle: "".concat(book.title, " | Hermit Habitat"),
              path: '/details',
              item: book,
              user: req.user,
              type: type,
              reviews: reviews,
              your_reviews: null
            });
          }
        });
      });
      break;

    case 'game':
      Game.findById(itemId).then(function (game) {
        Review.find({
          contentId: itemId
        }).then(function (reviews) {
          if (req.user) {
            //set filter to get only user's reviews, or all reviews if
            //user is admin/moderator
            var tmpFilter = {
              userId: null || req.user._id,
              contentId: itemId
            };

            if (req.user.adminStatus == "isAdmin" || req.user.adminStatus == "isModerator") {
              tmpFilter = {
                contentId: itemId
              };
            }

            Review.find(tmpFilter).then(function (userReviews) {
              res.render('general/details', {
                pageTitle: "".concat(game.title, " | Hermit Habitat"),
                path: '/details',
                item: game,
                user: req.user,
                type: type,
                reviews: reviews,
                your_reviews: userReviews
              });
            });
          } else {
            res.render('general/details', {
              pageTitle: "".concat(game.title, " | Hermit Habitat"),
              path: '/details',
              item: game,
              user: req.user,
              type: type,
              reviews: reviews,
              your_reviews: null
            });
          }
        });
      });
      break;
  }
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
          _context3.next = _context3.t0 === "book" ? 14 : _context3.t0 === "game" ? 16 : _context3.t0 === "movie" ? 18 : 20;
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

exports.postAddItem = function _callee4(req, res, next) {
  var itemType, title, author, bookGenre, movieGenre, rating, category, image, description, newBookGenre, newMovieGenre, newCategory, genre, v_errs, errMsgs, errIds, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, imageUrl, book, movie, game;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //gather the info from the form
          itemType = req.body.itemType;
          title = req.body.title;
          author = req.body.author;
          bookGenre = req.body.bookGenre;
          movieGenre = req.body.movieGenre;
          rating = req.body.rating;
          category = req.body.category;
          image = req.file;
          description = req.body.description;
          newBookGenre = req.body.newBookGenre;
          newMovieGenre = req.body.newMovieGenre;
          newCategory = req.body.newCategory;
          genre = []; //if it's a new book genre, make it genre

          if (bookGenre == "newGenre") {
            bookGenre = newBookGenre;
          } //if it's a new movie genre, make it genre


          if (movieGenre == "newGenre") {
            movieGenre = newMovieGenre;
          } //if it's a new category, make it category


          if (category == "newCategory") {
            category = newCategory;
          }
          /*
          //Old image validation 
          if(!image){
            let genre;
            switch(itemType){
              case "book": genre = bookGenre;
                break;
              case "movie": genre = movieGenre;
                break;
            }
            return res.status(422).render('admin/edit-item', {
              bookGenres: bookGenres,
              movieGenres: movieGenres,
              categories: gameCategories,
              pageTitle: 'Add Item',
              path: '/add-item',
              editing: false,
              user: req.user.username,
              isAuthenticated: false,
              errorMessage: 'Attached file is not a supported image type.',
              hasError: true,
              itemType: itemType,
              item: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
              validationErrors: []
            })
          } */
          //set default image if none given


          if (image) {
            _context4.next = 26;
            break;
          }

          _context4.t0 = itemType;
          _context4.next = _context4.t0 === "book" ? 20 : _context4.t0 === "movie" ? 22 : _context4.t0 === "game" ? 24 : 26;
          break;

        case 20:
          image = {
            filename: defaultBookImg
          };
          return _context4.abrupt("break", 26);

        case 22:
          image = {
            filename: defaultMovieImg
          };
          return _context4.abrupt("break", 26);

        case 24:
          image = {
            filename: defaultGameImg
          };
          return _context4.abrupt("break", 26);

        case 26:
          //validation:
          v_errs = validationResult(req);

          if (v_errs.isEmpty()) {
            _context4.next = 51;
            break;
          }

          errMsgs = [];
          errIds = [];
          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          _context4.prev = 33;

          for (_iterator6 = v_errs.array()[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            err = _step6.value;
            errMsgs.push(err.msg);
            errIds.push(err.params);
          }

          _context4.next = 41;
          break;

        case 37:
          _context4.prev = 37;
          _context4.t1 = _context4["catch"](33);
          _didIteratorError6 = true;
          _iteratorError6 = _context4.t1;

        case 41:
          _context4.prev = 41;
          _context4.prev = 42;

          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }

        case 44:
          _context4.prev = 44;

          if (!_didIteratorError6) {
            _context4.next = 47;
            break;
          }

          throw _iteratorError6;

        case 47:
          return _context4.finish(44);

        case 48:
          return _context4.finish(41);

        case 49:
          if (itemType == "book") {
            genre = bookGenre;
          } else if (itemType == "movie") {
            genre = movieGenre;
          }

          return _context4.abrupt("return", res.status(422).render('admin/edit-item', {
            bookGenres: bookGenres,
            movieGenres: movieGenres,
            categories: gameCategories,
            itemType: itemType,
            pageTitle: 'Add Item',
            path: '/add-item',
            editing: false,
            hasError: true,
            user: req.user.name,
            isAuthenticated: false,
            errMsgs: errMsgs,
            errIds: errIds,
            errorMessage: '',
            item: {
              title: title,
              author: author,
              genre: genre,
              rating: rating,
              category: category,
              description: description
            },
            validationErrors: []
          }));

        case 51:
          imageUrl = image.filename;
          console.log(_templateObject(), image); //save item based on type

          _context4.t2 = itemType;
          _context4.next = _context4.t2 === "book" ? 56 : _context4.t2 === "movie" ? 59 : _context4.t2 === "game" ? 62 : 65;
          break;

        case 56:
          book = new Book({
            title: title,
            author: author,
            genre: bookGenre,
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
                genre: bookGenre,
                rating: rating,
                category: category,
                description: description
              },
              validationErrors: errors.array()
            });
          });
          return _context4.abrupt("break", 67);

        case 59:
          movie = new Movie({
            title: title,
            genre: movieGenre,
            rating: rating,
            description: description,
            imageUrl: imageUrl,
            userId: req.user
          });
          movie.save().then(function (result) {
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
                genre: movieGenre,
                rating: rating,
                category: category,
                description: description
              },
              validationErrors: errors.array()
            });
          });
          return _context4.abrupt("break", 67);

        case 62:
          game = new Game({
            title: title,
            category: category,
            description: description,
            imageUrl: imageUrl,
            userId: req.user
          });
          game.save().then(function (result) {
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
          return _context4.abrupt("break", 67);

        case 65:
          console.log("postAddProduct - switch(default): ".concat(itemType));
          return _context4.abrupt("return", res.status(422).render('admin/edit-product', {
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
          }));

        case 67:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[33, 37, 41, 49], [42,, 44, 48]]);
};

exports.postAddAnother = function (req, res, next) {
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
  }
  /*
   //Old image validation
   if(!image){
    let genre;
    switch(itemType){
      case "book": genre = bookGenre;
        break;
      case "movie": genre = movieGenre;
        break;
    }
     return res.status(422).render('admin/edit-item', {
       pageTitle: 'Add Item',
       path: '/add-item',
       editing: false,
       user: req.user.username,
       isAuthenticated: false,
       errorMessage: 'Attached file is not a supported image type.',
       hasError: true,
       itemType: itemType,
       item: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
       validationErrors: []
     })
   }
   */
  //set default image if none given


  if (!image) {
    switch (itemType) {
      case "book":
        image = {
          filename: defaultBookImg
        };
        break;

      case "movie":
        image = {
          filename: defaultMovieImg
        };
        break;

      case "game":
        image = {
          filename: defaultGameImg
        };
        break;
    }
  } //validation:


  var v_errs = validationResult(req);

  if (!v_errs.isEmpty()) {
    var errMsgs = [];
    var errIds = [];
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = v_errs.array()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        err = _step7.value;
        errMsgs.push(err.msg);
        errIds.push(err.params);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    if (itemType == "book") {
      genre = bookGenre;
    } else if (itemType == "movie") {
      genre = movieGenre;
    }

    console.log("BOOKGENRES" + bookGenres);
    return res.status(422).render('admin/edit-item', {
      bookGenres: bookGenres,
      movieGenres: movieGenres,
      categories: gameCategories,
      itemType: itemType,
      pageTitle: 'Add Item',
      path: '/add-item',
      editing: false,
      hasError: true,
      user: req.user.name,
      isAuthenticated: false,
      errMsgs: errMsgs,
      errIds: errIds,
      errorMessage: '',
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
  }

  var imageUrl = image.filename;
  console.log(_templateObject2(), image); //save item based on type

  switch (itemType) {
    case "book":
      var book = new Book({
        title: title,
        author: author,
        genre: bookGenre,
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
      var movie = new Movie({
        title: title,
        genre: movieGenre,
        rating: rating,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });
      movie.save().then(function (result) {
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
      var game = new Game({
        title: title,
        category: category,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
      });
      game.save().then(function (result) {
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
  var genre = '';
  console.log("postEditItem updatedBookGenre: ".concat(updatedBookGenre)); //if it's a new book genre, make it genre

  if (updatedBookGenre == "newGenre") {
    updatedBookGenre = newBookGenre;
  } //if it's a new movie genre, make it genre


  if (updatedMovieGenre == "newGenre") {
    updatedMovieGenre = newMovieGenre;
  } //if it's a new category, make it category


  if (updatedCategory == "newCategory") {
    category = newCategory;
  } //validation:


  var v_errs = validationResult(req);

  if (!v_errs.isEmpty()) {
    var errMsgs = [];
    var errIds = [];
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = v_errs.array()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        err = _step8.value;
        errMsgs.push(err.msg);
        errIds.push(err.params);
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
          _iterator8["return"]();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }

    if (itemType == "book") {
      genre = updatedBookGenre;
    } else if (itemType == "movie") {
      genre = updatedMovieGenre;
    }

    return res.status(422).render('admin/edit-item', {
      bookGenres: bookGenres,
      movieGenres: movieGenres,
      categories: gameCategories,
      itemType: itemType,
      pageTitle: 'Add Item',
      path: '/add-item',
      editing: true,
      hasError: true,
      user: req.user.name,
      isAuthenticated: false,
      errMsgs: errMsgs,
      errIds: errIds,
      errorMessage: '',
      item: {
        title: updatedTitle,
        author: updatedAuthor,
        genre: genre,
        rating: updatedRating,
        category: updatedCategory,
        description: updatedDescription,
        imageUrl: req.body.oldImgURL,
        _id: itemId
      },
      validationErrors: []
    });
  } //locate existing product in db


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
  return regeneratorRuntime.async(function getBookGenres$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Book.find().distinct("genre").then(function (genres) {
            var genresLength = genres.length;

            for (var i = 0; i < genresLength; i++) {
              if (!bookGenres.includes(genres[i])) {
                bookGenres.push(genres[i]);
              }
            }

            bookGenres.sort();
          })["catch"](function (err) {
            console.log(_templateObject3(), err);
          }));

        case 2:
          return _context5.abrupt("return");

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getMovieGenres() {
  return regeneratorRuntime.async(function getMovieGenres$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Movie.find().distinct("genre").then(function (genres) {
            var genresLength = genres.length;

            for (var i = 0; i < genresLength; i++) {
              if (!movieGenres.includes(genres[i])) {
                movieGenres.push(genres[i]);
              }
            }

            movieGenres.sort();
          })["catch"](function (err) {
            console.log(_templateObject4(), err);
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getCategories() {
  return regeneratorRuntime.async(function getCategories$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Game.find().distinct("category").then(function (categories) {
            gameCategories = categories;
            gameCategories.sort();
          }));

        case 2:
        case "end":
          return _context7.stop();
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
}; // Add Review to DB


exports.submitReview = function (req, res, next) {
  var reviewText = req.body.fullReview;
  var itemId = req.body.itemId;
  var type = req.body.type;
  var newReview = new Review({
    reviewText: reviewText,
    contentId: itemId,
    date: Date.now(),
    userId: req.user._id,
    username: req.user.username
  });
  console.log(itemId.toString());
  newReview.save().then(function (result) {
    console.log('Submitted Review!');
    res.redirect("/details/".concat(itemId.toString(), "?type=").concat(type));
  });
}; // Display Edit Review page


exports.getEditReview = function (req, res, next) {
  var itemId = req.body.itemId;
  var type = req.body.type;
  var reviewText = req.body.reviewText;
  var title = req.body.itemTitle;
  var reviewId = req.body.reviewId;
  res.render('general/edit-review', {
    pageTitle: "Edit Review | Hermit Habitat",
    path: '/edit-review',
    itemId: itemId,
    type: type,
    reviewText: reviewText,
    title: title,
    reviewId: reviewId
  });
}; // Update Review in DB


exports.updateReview = function (req, res, next) {
  var itemId = req.body.itemId;
  var type = req.body.type;
  var reviewText = req.body.reviewText;
  var reviewId = req.body.reviewId;
  Review.findById(reviewId).then(function (review) {
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/');
    }

    review.reviewText = reviewText;
    review.date = Date.now();
    return review.save().then(function (result) {
      console.log('Updated Item');
      res.redirect("/details/".concat(itemId, "?type=").concat(type));
    })["catch"](function (err) {
      console.log(err);
    });
  });
}; // Delete Review in DB


exports.postDelReview = function (req, res, next) {
  var reviewId = req.body.reviewId;
  var itemId = req.body.itemId;
  var type = req.body.type;
  var reviewFilter = {
    _id: reviewId,
    userId: req.user._id
  };

  if (req.user.adminStatus === "isAdmin" || req.user.adminStatus == "isModerator") {
    reviewFilter = {
      _id: reviewId
    };
  }

  Review.deleteOne(reviewFilter).then(function (result) {
    console.log('Review Deleted.');
    res.redirect("/details/".concat(itemId, "?type=").concat(type));
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postDelItem = function (req, res, next) {
  var itemId = req.body.itemId;
  var type = req.body.type;
  var uid = req.body.uid;
  var itemType = null; //set var to access model

  if (type == "movie") {
    itemType = Movie;
  } else if (type == "book") {
    itemType = Book;
  } else if (type == "game") {
    itemType = Game;
  } else {
    return next(new Error("Unknown item time to be deleted: '${type}'"));
  } //check user is authed


  User.findById(uid).then(function (user) {
    if (user && req.user._id.toString() === user._id.toString() && (req.user.adminStatus === 'isAdmin' || req.user.adminStatus === 'isModerator')) {
      console.log("del id: ", itemId);
      Review.deleteMany({
        "contentId": itemId
      }).then(function (result) {
        //now that reviews deleted, delete item
        itemType.deleteOne({
          _id: itemId
        }).then(function (item) {
          console.log("Reviews deleted for item ".concat(itemId, "."));
          res.redirect("/".concat(type, "s"));
        })["catch"](function (err) {
          throw new Error("Error while deleting item " + itemId + ": " + err);
        });
      })["catch"](function (err) {
        console.log(err);
        next(err);
      });
    } else {
      console.log(req.user._id.toString() === user._id.toString());
      console.log(req.user.adminStatus);
      res.redirect("/".concat(type, "s"));
    }
  })["catch"](function (err) {
    return next(err);
  });
}; //END POST DELETE ALL ITEM REVIEWS