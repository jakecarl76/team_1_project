"use strict";

var Book = require('../models/book');

var Movie = require('../models/movie');

var Game = require('../models/game');

var User = require('../models/user'); //

/*
exports.get = (req, res, next) => {
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};
*/
//THIS ISN'T DONE- YOU NEED TO PULL WHAT'S IN THE LIBRARY, NOT WHAT THEY'VE CREATED!
// exports.getMyLibrary = async (req, res, next) => {
//   let bookList = [];
//   let movieList = [];
//   let gameList = [];
//   let favorites = [];
//   let user = req.user;
//   // console.log`favorites (getMyLibrary): ${favorites}`;
//   Book.find({userId: req.user._id})
//   .then(books => {
//     bookList = books;
//     Movie.find({userId: req.user._id})
//     .then(movies => {
//       movieList = movies;
//       Game.find({userId: req.user._id})
//       .then(games => {
//         gameList = games;
//           User.findById(user)
//           .then(user => {
//             console.log("in getFavorites!")
//             let faveBooks = user.bookLib.favorites;
//             let faveMovies = user.movieLib.favorites;
//             let faveGames = user.gameLib.favorites;
//             let title, genre, img, item, type, id;  
//             Book.find({_id: {$in: faveBooks}})
//             .then(books => {
//               for(let book of books){
//                 title = book.title;
//                 genre = book.genre;
//                 img = book.imageUrl;
//                 type = "book";
//                 id = book._id;
//                 item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
//                 favorites.push(item);
//               }
//               console.log("getFavorites book.find loop complete");
//               Movie.find({_id: {$in: faveMovies}})
//               .then(movies => {
//                 for(let movie of movies){
//                 title = movie.title;
//                 genre = movie.genre;
//                 img = movie.imageUrl;
//                 type = "movie";
//                 id = movie._id;
//                 item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
//                 favorites.push(item);
//               }
//               console.log("getFavorites movie.find loop complete");
//                 Game.find({_id: {$in: faveGames}})
//                 .then(games => {
//                   for(let game of games){
//                   title = game.title;
//                   genre = game.category;
//                   img = game.imageUrl;
//                   type = "game";
//                   id = game._id;
//                   item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
//                   favorites.push(item);
//                 }
//                 console.log("getFavorites game.find loop complete");
//                 console.log`favorites 1: ${favorites}`;
//                 //render the page using those items
//                 res.render('admin/my-library', {
//                   books: bookList,
//                   movies: movieList,
//                   games: gameList,
//                   favorites: favorites,
//                   pageTitle: 'My Library',
//                   path: '/my-library',
//                   user: req.user
//                 });
//                 })
//               })
//               .catch(err => {
//                 const error = new Error(err);
//                 error.httpStatusCode = 500;
//                 console.log('getMyLibrary 1086');
//                 return next(error);
//               });
//             })
//             .catch(err => {
//               const error = new Error(err);
//               error.httpStatusCode = 500;
//               console.log('getMyLibrary 1093');
//               return next(error);
//             });
//           })
//           .catch(err => {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             console.log('getMyLibrary 1100');
//             return next(error);
//           });            
//       })
//     })
//   })
//   .catch(err => {
//     const error = new Error(err);
//     error.httpStatusCode = 500;
//     console.log('getMyLibrary 1109');
//     return next(error);
//   });
// }


exports.getMyLibrary = function _callee(req, res, next) {
  var bookList, movieList, gameList, favorites, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          bookList = [];
          movieList = [];
          gameList = [];
          favorites = [];
          user = req.user; // console.log`favorites (getMyLibrary): ${favorites}`;

          User.findById(user).then(function (user) {
            var faveBooks = user.bookLib.favorites;
            var faveMovies = user.movieLib.favorites;
            var faveGames = user.gameLib.favorites;
            var title, genre, img, item, type, id;
            var myBooks = user.bookLib.lib;
            var myMovies = user.movieLib.lib;
            var myGames = user.gameLib.lib;
            Book.find({
              _id: {
                $in: faveBooks
              }
            }).then(function (books) {
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
                  favorites.push(item);
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

              console.log("getMyLibrary- favorites book.find loop complete");
              Movie.find({
                _id: {
                  $in: faveMovies
                }
              }).then(function (movies) {
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

                console.log("getMyLibrary- favorites movie.find loop complete");
                Game.find({
                  _id: {
                    $in: faveGames
                  }
                }).then(function (games) {
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

                  console.log("getMyLibrary- favorites game.find loop complete");
                  Book.find({
                    _id: {
                      $in: myBooks
                    }
                  }).then(function (books) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                      for (var _iterator4 = books[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var book = _step4.value;
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

                    console.log("getMyLibrary- myBooks.find loop complete");
                    Movie.find({
                      _id: {
                        $in: myMovies
                      }
                    }).then(function (movies) {
                      var _iteratorNormalCompletion5 = true;
                      var _didIteratorError5 = false;
                      var _iteratorError5 = undefined;

                      try {
                        for (var _iterator5 = movies[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                          var movie = _step5.value;
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

                      console.log("getMyLibrary- mymovies.find loop complete");
                      Game.find({
                        _id: {
                          $in: myGames
                        }
                      }).then(function (games) {
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                          for (var _iterator6 = games[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var game = _step6.value;
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
                          _didIteratorError6 = true;
                          _iteratorError6 = err;
                        } finally {
                          try {
                            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                              _iterator6["return"]();
                            }
                          } finally {
                            if (_didIteratorError6) {
                              throw _iteratorError6;
                            }
                          }
                        }

                        console.log("getMyLibrary- mygames.find loop complete"); //render the page using those items

                        res.render('admin/my-library', {
                          books: bookList,
                          movies: movieList,
                          games: gameList,
                          favorites: favorites,
                          pageTitle: 'My Library',
                          path: '/my-library',
                          user: req.user
                        });
                      })["catch"](function (err) {
                        var error = new Error(err);
                        error.httpStatusCode = 500;
                        console.log('getMyLibrary 227');
                        return next(error);
                      });
                    })["catch"](function (err) {
                      var error = new Error(err);
                      error.httpStatusCode = 500;
                      console.log('getMyLibrary 234');
                      return next(error);
                    });
                  })["catch"](function (err) {
                    var error = new Error(err);
                    error.httpStatusCode = 500;
                    console.log('getMyLibrary 241');
                    return next(error);
                  });
                })["catch"](function (err) {
                  var error = new Error(err);
                  error.httpStatusCode = 500;
                  console.log('getMyLibrary 248');
                  return next(error);
                });
              })["catch"](function (err) {
                var error = new Error(err);
                error.httpStatusCode = 500;
                console.log('getMyLibrary 255');
                return next(error);
              });
            });
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}; // console.log("getFavorites game.find loop complete");
//           console.log`favorites 1: ${favorites}`;
//           //render the page using those items
//           res.render('admin/my-library', {
//             books: bookList,
//             movies: movieList,
//             games: gameList,
//             favorites: favorites,
//             pageTitle: 'My Library',
//             path: '/my-library',
//             user: req.user
//           });


exports.postAdjustLibrary = function (req, res, next) {
  var user = req.user;
  var itemType = req.body.itemType.toString();
  var id = req.body.itemId.toString();
  var msg;
  User.findById(user).then(function (user) {
    console.log("postAdjustLibrary - user: ".concat(user)); //is it already in Favorites?

    switch (itemType) {
      case "book":
        if (!user.bookLib.lib.includes(id)) {
          user.bookLib.lib.push(id);
          msg = "Book added to bookLib.lib.";
          console.log("postAdjustLibrary: book not in library 294");
        } else {
          var index = use;
          console.log("postAdjustLibrary: book in library 298");
          r.bookLib.lib.findIndex(function (index) {
            return index == id;
          });
          console.log("index: ".concat(index));
          user.bookLib.lib.splice(index, 1);
          msg = "Book removed from bookLib.lib.";

          if (user.bookLib.favorites.includes(id)) {
            console.log("bookId ".concat(id, " found in favorites"));
            var favIndex = user.bookLib.favorites.findIndex(function (index) {
              return index == id;
            });
            user.bookLib.favorites.splice(favIndex, 1);
          }
        }

        user.save().then(function (results) {
          console.log(msg);
          console.log("".concat(user.username, ".bookLib: ").concat(user.bookLib));
        })["catch"](function (err) {
          var error = new Error(err);
          error.httpStatusCode = 500;
          console.log("postAddtoLibrary user.save (book) error: ".concat(err));
          return next(error);
        });
        res.redirect('/my-library#books');
        break;

      case "movie":
        if (!user.movieLib.lib.includes(id)) {
          user.movieLib.lib.push(id);
          console.log("Movie added to movieLib.lib");
        } else {
          var _index = user.movieLib.lib.findIndex(function (index) {
            return index == id;
          });

          user.movieLib.lib.splice(_index, 1);
          msg = "Movie removed from movieLib.lib.";

          if (user.movieLib.favorites.includes(id)) {
            console.log("movieId ".concat(id, " found in favorites"));

            var _favIndex = user.movieLib.favorites.findIndex(function (index) {
              return index == id;
            });

            user.movieLib.favorites.splice(_favIndex, 1);
          }
        }

        user.save().then(function (results) {
          console.log("".concat(user.username, ".movieLib: ").concat(user.movieLib));
        })["catch"](function (err) {
          var error = new Error(err);
          error.httpStatusCode = 500;
          console.log("postAddToLibrary user.save (movie) error: ".concat(err));
          return next(error);
        });
        res.redirect('/my-library#books');
        break;

      case "game":
        if (!user.gameLib.lib.includes(id)) {
          user.gameLib.lib.push(id);
          msg = "Game added to gameLib.lib.";
        } else {
          var _index2 = user.gameLib.lib.findIndex(function (index) {
            return index == id;
          });

          user.gameLib.lib.splice(_index2, 1);
          msg = "Game removed from gameLib.lib.";

          if (user.gameLib.favorites.includes(id)) {
            console.log("gameId ".concat(id, " found in favorites"));

            var _favIndex2 = user.gameLib.favorites.findIndex(function (index) {
              return index == id;
            });

            user.gameLib.favorites.splice(_favIndex2, 1);
          }
        }

        user.save().then(function (results) {
          console.log(msg);
          console.log("".concat(user.username, ".gameLib: ").concat(user.gameLib));
        })["catch"](function (err) {
          var error = new Error(err);
          error.httpStatusCode = 500;
          console.log("postAddToLibrary user.save (game) error: ".concat(err));
          return next(error);
        });
        res.redirect('/my-library#games');
        break;

      default:
        res.redirect('/my-library');
    }
  });
};