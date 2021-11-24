const Book = require('../models/book');
const Movie = require('../models/movie');
const Game = require('../models/game');
const User = require('../models/user');
//
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

exports.getMyLibrary = async (req, res, next) => {
  let bookList = [];
  let movieList = [];
  let gameList = [];
  let favorites = [];
  let user = req.user;
  // console.log`favorites (getMyLibrary): ${favorites}`;
  
  User.findById(user)
    .then(user => {
      let faveBooks = user.bookLib.favorites;
      let faveMovies = user.movieLib.favorites;
      let faveGames = user.gameLib.favorites;
      let title, genre, img, item, type, id;
      
      let myBooks = user.bookLib.lib;
      let myMovies = user.movieLib.lib;
      let myGames = user.gameLib.lib;

      Book.find({_id: {$in: faveBooks}})
      .then(books => {
        for(let book of books){
          title = book.title;
          genre = book.genre;
          img = book.imageUrl;
          type = "book";
          id = book._id;
          item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
          favorites.push(item);
        }
        console.log("getMyLibrary- favorites book.find loop complete");
        Movie.find({_id: {$in: faveMovies}})
        .then(movies => {
          for(let movie of movies){
          title = movie.title;
          genre = movie.genre;
          img = movie.imageUrl;
          type = "movie";
          id = movie._id;
          item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
          favorites.push(item);
        }
        console.log("getMyLibrary- favorites movie.find loop complete");
          Game.find({_id: {$in: faveGames}})
          .then(games => {
            for(let game of games){
            title = game.title;
            genre = game.category;
            img = game.imageUrl;
            type = "game";
            id = game._id;
            item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
            favorites.push(item);
          }
          console.log("getMyLibrary- favorites game.find loop complete");
          Book.find({_id: {$in: myBooks}})
          .then(books => {
            for(let book of books){
              title = book.title;
              genre = book.genre;
              img = book.imageUrl;
              type = "book";
              id = book._id;
              item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
              bookList.push(item);
            }
            console.log("getMyLibrary- myBooks.find loop complete");

            Movie.find({_id: {$in: myMovies}})
              .then(movies => {
                for(let movie of movies){
                title = movie.title;
                genre = movie.genre;
                img = movie.imageUrl;
                type = "movie";
                id = movie._id;
                item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
                movieList.push(item);
              }
              console.log("getMyLibrary- mymovies.find loop complete");
              Game.find({_id: {$in: myGames}})
                .then(games => {
                  for(let game of games){
                  title = game.title;
                  genre = game.category;
                  img = game.imageUrl;
                  type = "game";
                  id = game._id;
                  item = {type: type, title: title, genre: genre, imageUrl: img, id: id};
                  gameList.push(item);
                }
                console.log("getMyLibrary- mygames.find loop complete");
                //render the page using those items
                res.render('admin/my-library', {
                  books: bookList,
                  movies: movieList,
                  games: gameList,
                  favorites: favorites,
                  pageTitle: 'My Library',
                  path: '/my-library',
                  user: req.user
                });
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log('getMyLibrary 227');
                return next(error);
              });  
            })
            .catch(err => {
              const error = new Error(err);
              error.httpStatusCode = 500;
              console.log('getMyLibrary 234');
              return next(error);
            });
          })
          .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            console.log('getMyLibrary 241');
            return next(error);
          });
        })
        .catch(err => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          console.log('getMyLibrary 248');
          return next(error);
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getMyLibrary 255');
        return next(error);
      });
    })




})
}


// console.log("getFavorites game.find loop complete");
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

exports.postAdjustLibrary = (req, res, next) => {
  const user = req.user;
  const itemType = req.body.itemType.toString();
  const id = req.body.itemId.toString();
  let msg;
  User.findById(user)
    .then(user => {

      console.log(`postAdjustLibrary - user: ${user}`);

      //is it already in Favorites?
      switch(itemType){
        case "book":
          if(!user.bookLib.lib.includes(id)){
            user.bookLib.lib.push(id);
            msg = "Book added to bookLib.lib.";}
            else{
              let index = user.bookLib.lib.findIndex(index => {
                return index == id;
              });
              console.log(`index: ${index}`);
              user.bookLib.lib.splice(index, 1);
              msg = "Book removed from bookLib.lib.";
              if(user.bookLib.favorites.includes(id)){
                console.log(`bookId ${id} found in favorites`);
                let favIndex = user.bookLib.favorites.findIndex(index => {
                  return index == id;
                });
                user.bookLib.favorites.splice(favIndex, 1);
              }
            }
            user.save()
              .then(results => {
                console.log(msg);
                console.log(`${user.username}.bookLib: ${user.bookLib}`);
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log(`postAddtoLibrary user.save (book) error: ${err}`);
                return next(error);
              })
            res.redirect('/my-library#books');
            
          break;
        case "movie":
          if(!user.movieLib.lib.includes(id)){
            user.movieLib.lib.push(id);
            console.log("Movie added to movieLib.lib");
          } else {
            let index = user.movieLib.lib.findIndex(index => {
              return index == id;
            });
              user.movieLib.lib.splice(index, 1);
              msg = "Movie removed from movieLib.lib.";
              if(user.movieLib.favorites.includes(id)){
                console.log(`movieId ${id} found in favorites`);
                let favIndex = user.movieLib.favorites.findIndex(index => {
                  return index == id;
                });
                user.movieLib.favorites.splice(favIndex, 1);
              }
          }
            user.save()
              .then(results => {
                console.log(`${user.username}.movieLib: ${user.movieLib}`);
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log(`postAddToLibrary user.save (movie) error: ${err}`);
                return next(error);
              })

          res.redirect('/my-library#movies');
          break;
        case "game":
          if(!user.gameLib.lib.includes(id)){
            user.gameLib.lib.push(id);
            msg = "Game added to gameLib.lib.";
          } else {
            let index = user.gameLib.lib.findIndex(index => {
              return index == id;
            });
              user.gameLib.lib.splice(index, 1);
              msg = "Game removed from gameLib.lib.";
              if(user.gameLib.favorites.includes(id)){
                console.log(`gameId ${id} found in favorites`);
                let favIndex = user.gameLib.favorites.findIndex(index => {
                  return index == id;
                });
                user.gameLib.favorites.splice(favIndex, 1);
              }
          }
            user.save()
              .then(results => {
                console.log(msg);
            console.log(`${user.username}.gameLib: ${user.gameLib}`);
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log(`postAddToLibrary user.save (game) error: ${err}`);
                return next(error);
              })
          
          res.redirect('/my-library#games');
          break;
        default:
          res.redirect('/my-library');
      }
    })

}