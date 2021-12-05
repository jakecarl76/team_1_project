//import models
const {validationResult} = require('express-validator/check');

//import models
const Book = require('../models/book');
const Movie = require('../models/movie');
const Game = require('../models/game');
const User = require('../models/user');
const Review = require('../models/review');

let bookGenres = [];
let movieGenres = [];
let gameCategories = [];

//get index
exports.getIndex = async (req, res, next) => {
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};

exports.getAddItem= async (req, res, next) => {
  await getBookGenres();
  await getMovieGenres();
  await getCategories();
  console.log(`bookGenres: ${bookGenres}; movieGenres: ${movieGenres}; categories: ${gameCategories}`);
    res.render('admin/edit-item', {
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
      validationErrors: [],
      categories: gameCategories
    })
  }

// Get All Movies and render
exports.getMovies = (req, res, next) => {
  let user = null;
  if(req.user){
    user = req.user;
  }
  Movie.find()
    .then(movies => {
      res.render('general/movies', {
        pageTitle: 'Movies | Hermit Habitat',
        path: '/movies',
        content: movies,
        user: user
      });
    });
};

// Get All Games and render
exports.getGames = (req, res, next) => {
  let user = null;
  if(req.user){
    user = req.user;
  }
  Game.find()
    .then(games => {
      res.render('general/games', {
        pageTitle: 'Games | Hermit Habitat',
        path: '/games',
        content: games,
        user: user
      });
    });
};

// Get All Books and render
exports.getBooks = (req, res, next) => {
  let user = null;
  if(req.user){
    user = req.user;
  }
  Book.find()
    .then(books => {
      res.render('general/books', {
        pageTitle: 'Books | Hermit Habitat',
        path: '/books',
        content: books,
        user: user
      });
    });
};

// Get Randomizer
exports.getRandomizer = (req, res, next) => {
  
  // Get randomizer type from query
  const type = req.query.type;

  // Get genre from query
  let contentGenre = req.query.genre;

  switch (type) {
    case 'movie':
      // Find all movies
      Movie.find()
        .then(movies => {

      const genreIteration = [];

      // Push all movie genre to array
      for (let movie of movies) {
        genreIteration.push(movie.genre);
      }

      // Filter movie genre to have unique values
      const genre = genreIteration.filter((value, index) => genreIteration.indexOf(value) === index);

      // Display different results if genre is in URL query
      if (contentGenre) {

        // Get random movie from mongodb based on genre
        Movie.aggregate([
          {
            $match: {
              genre: contentGenre
            }
          },
          {
            $sample: {
              size: 1
            }
          }
        ])
          .then(mov => {
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
      };
    });
      break;
    case 'game':
      // Find all movies
      Game.find()
        .then(games => {

      const genreIteration = [];

      // Push all movie genre to array
      for (let game of games) {
         genreIteration.push(game.category);
      }

      // Filter movie genre to have unique values
      const genre = genreIteration.filter((value, index) => genreIteration.indexOf(value) === index);

      // Display different results if genre is in URL query
      if (contentGenre) {

        // Get random movie from mongodb based on genre
        Game.aggregate([
          {
            $match: {
              category: contentGenre
            }
          },
          {
            $sample: {
              size: 1
            }
          }
        ])
          .then(gam => {
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
      };
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
};

// Get Item Details
exports.getItemDetails = (req, res, next) => {
  const itemId = req.params.itemId;
  const type = req.query.type;

  switch (type) {
    case 'movie':
      Movie.findById(itemId)
        .then(movie => {
          Review.find({
            contentId: itemId
          })
            .then(reviews => {
              if (req.user) {
                Review.find({
                  userId: null || req.user._id,
                  contentId: itemId
                })
                .then(userReviews => {
                  res.render('general/details', {
                    pageTitle: `${movie.title} | Hermit Habitat`,
                    path: '/details',
                    item: movie,
                    user: req.user,
                    type: type,
                    reviews: reviews,
                    your_reviews: userReviews
                    })
                })
              } else {
                res.render('general/details', {
                  pageTitle: `${movie.title} | Hermit Habitat`,
                  path: '/details',
                  item: movie,
                  user: req.user,
                  type: type,
                  reviews: reviews,
                  your_reviews: null
                  })
              }
          })
        })
      break;
    
    case 'book':
      Book.findById(itemId)
        .then(book => {
          Review.find({
            contentId: itemId
          })
            .then(reviews => {
              if (req.user) {
                Review.find({
                  userId: null || req.user._id,
                  contentId: itemId
                })
                  .then(userReviews => {
                    res.render('general/details', {
                      pageTitle: `${book.title} | Hermit Habitat`,
                      path: '/details',
                      item: book,
                      user: req.user,
                      type: type,
                      reviews: reviews,
                      your_reviews: userReviews
                    })
                  })
              } else {
                res.render('general/details', {
                  pageTitle: `${book.title} | Hermit Habitat`,
                  path: '/details',
                  item: book,
                  user: req.user,
                  type: type,
                  reviews: reviews,
                  your_reviews: null
                })
              }
            })
        })
      break;
    
    case 'game':
      Game.findById(itemId)
        .then(game => {
          Review.find({
            contentId: itemId
          })
            .then(reviews => {
              if (req.user) {
                Review.find({
                  userId: null || req.user._id,
                  contentId: itemId
                })
                  .then(userReviews => {
                    res.render('general/details', {
                      pageTitle: `${game.title} | Hermit Habitat`,
                      path: '/details',
                      item: game,
                      user: req.user,
                      type: type,
                      reviews: reviews,
                      your_reviews: userReviews
                    })
                  })
              } else {
                res.render('general/details', {
                  pageTitle: `${game.title} | Hermit Habitat`,
                  path: '/details',
                  item: game,
                  user: req.user,
                  type: type,
                  reviews: reviews,
                  your_reviews: null
                })
              }
            })
        })
      break;
  }
};

/*cannot test until My Items page is created*/
// link to add for edit item: "edit-item/6189b7e12defcea0f68bdc6b/game"
//get Edit Item
exports.getEditItem = async (req, res, next) => {
  await getBookGenres();
  await getMovieGenres();
  await getCategories();
  
  //Is the user in edit mode? Only allow access if in edit mode.
  const editMode = true; //req.query.edit;
  
  //if not in edit mode, redirect Home
  if(!editMode){
    return res.redirect('/');
  }
  
  //gather item id and type from params
  const itemId = req.params.itemId;
  const itemType = req.params.itemType.toString();

  //locate product
  switch (itemType){
    case "book":
      Book.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, editMode, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log(`getEditItem case:book catch; item: ${item}`);
        return next(error);
      });
      break;
    case "game":
      Game.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, editMode, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log(`getEditItem case:game catch; item: ${item}`);
        return next(error);
      });
      break;
    case "movie":
      Movie.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, editMode, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log(`getEditItem case:movie catch; item: ${item}`);
        return next(error);
      });
      break;
    default:
      displayEditItem();
      console.log(`getEditItem case: default - Not accepted parameter. itemType: ${itemType}`)
  }
}
  
/* used in getEditItem*/
function displayEditItem(item, itemType, editMode, res, req){
  //if no item, redirect Home
  if (!item) {
    console.log(`NO ITEM TO DISPLAY`);
    return res.redirect('/');
  }
  //if product found, send to edit product with product info
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
  })
}

exports.postAddItem = async (req, res, next) => {
  //gather the info from the form
  const itemType= req.body.itemType;
  const title = req.body.title;
  const author = req.body.author;
  let bookGenre = req.body.bookGenre;
  let movieGenre = req.body.movieGenre;
  const rating = req.body.rating;
  let category = req.body.category;
  let image = req.file;
  const description = req.body.description;
  const newBookGenre = req.body.newBookGenre;
  const newMovieGenre = req.body.newMovieGenre
  const newCategory = req.body.newCategory;
  let genre = [];

  //if it's a new book genre, make it genre
  if(bookGenre == "newGenre"){
    bookGenre = newBookGenre;
  }
   //if it's a new movie genre, make it genre
   if(movieGenre == "newGenre"){
    movieGenre = newMovieGenre;
  }
  //if it's a new category, make it category
  if(category == "newCategory"){
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
  if(!image)
  {
    switch(itemType)
    {
      case "book":
        image = {filename: "default-book-image.png"};
        break;
      case "movie":
        image = {filename: "default-movie-image.png"};
        break;
      case "game":
        image = {filename: "default-game-image.png"};
        break;
    }
  }

  //validation:
  const v_errs = validationResult(req);

  
  if(!v_errs.isEmpty())
  {
    let errMsgs = [];
    let errIds = [];

    for(err of v_errs.array())
    {
      errMsgs.push(err.msg);
      errIds.push(err.params);
    }

    if(itemType == "book")
    {
      genre = bookGenre;
    }
    else if(itemType == "movie")
    {
      genre = movieGenre;
    }


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
      item: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
      validationErrors: []
    })
  }

  const imageUrl = image.filename;
console.log`postAddItem- image: ${image}`;
  //save item based on type
 switch(itemType){
   case "book": 
      const book = new Book({
        title: title, 
        author: author, 
        genre: bookGenre,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
      });
      book.save()
      .then(result => {
        //log success and redirect to admin products
        console.log('Created Book');
        res.redirect('/my-library');
      })
      .catch(err => {
        console.log(`postAddItem - switch(book) catch: ${err}`);
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {title: title, author: author, genre: bookGenre, rating: rating, category: category, description: description},
          validationErrors: errors.array()
        })
      });
      break;
    case "movie":
      const movie = new Movie({
        title: title,  
        genre: movieGenre,
        rating: rating,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
      });
      movie.save()
      .then(result => {
        //log success and redirect to admin products
        console.log('Created Movie');
        res.redirect('/my-library');
      })
      .catch(err => {
        console.log(`postAddProduct - switch(movie) catch: ${err}`);
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {title: title, author: author, genre: movieGenre, rating: rating, category: category, description: description},
          validationErrors: errors.array()
        })
      });
      break;
    case "game":
      const game = new Game({
        title: title,  
        category: category,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
      });
      game.save()
      .then(result => {
        //log success and redirect to admin products
        getCategories();
        console.log('Created Game');
        res.redirect('/my-library');
      })
      .catch(err => {
        console.log(`postAddProduct - switch(game) catch: ${err}`);
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
          validationErrors: errors.array()
        })
      });
      break;
      default: 
      console.log(`postAddProduct - switch(default): ${itemType}`);
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
          validationErrors: []
        })
 }

}

exports.postAddAnother = (req, res, next) => {
 //gather the info from the form
 const itemType= req.body.itemType;
 const title = req.body.title;
 const author = req.body.author;
 let bookGenre = req.body.bookGenre;
 let movieGenre = req.body.movieGenre;
 const rating = req.body.rating;
 let category = req.body.category;
 let image = req.file;
 const description = req.body.description;
 const newBookGenre = req.body.newBookGenre;
 const newMovieGenre = req.body.newMovieGenre
 const newCategory = req.body.newCategory;

 //if it's a new book genre, make it genre
 if(bookGenre == "newGenre"){
   bookGenre = newBookGenre;
 }
  //if it's a new movie genre, make it genre
  if(movieGenre == "newGenre"){
   movieGenre = newMovieGenre;
 }
 //if it's a new category, make it category
 if(category == "newCategory"){
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
  if(!image)
  {
    switch(itemType)
    {
      case "book":
        image = {filename: "default-book-image.png"};
        break;
      case "movie":
        image = {filename: "default-movie-image.png"};
        break;
      case "game":
        image = {filename: "default-game-image.png"};
        break;
    }
  }
 
  //validation:
  const v_errs = validationResult(req);

  
  if(!v_errs.isEmpty())
  {
    let errMsgs = [];
    let errIds = [];

    for(err of v_errs.array())
    {
      errMsgs.push(err.msg);
      errIds.push(err.params);
    }

    
    if(itemType == "book")
    {
      genre = bookGenre;
    }
    else if(itemType == "movie")
    {
      genre = movieGenre;
    }
    console.log("BOOKGENRES" + bookGenres)

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
      item: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
      validationErrors: []
    })
  }

 const imageUrl = image.filename;
console.log`postAddItem- image: ${image}`;
 //save item based on type
switch(itemType){
  case "book": 
     const book = new Book({
       title: title, 
       author: author, 
       genre: bookGenre,
       description: description, 
       imageUrl: imageUrl,
       userId: req.user
     });
     book.save()
     .then(result => {
       //log success and redirect to admin products
       console.log('Created Book');
       res.redirect('/add-item');
     })
     .catch(err => {
       console.log(`postAddItem - switch(book) catch: ${err}`);
       return res.status(422).render('admin/edit-product', {
         pageTitle: 'Add Item',
         path: '/add-item',
         editing: false,
         user: req.user.username,
         isAuthenticated: false,
         errorMessage: [],
         hasError: false,
         product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
         validationErrors: errors.array()
       })
     });
     break;
   case "movie":
     const movie = new Movie({
       title: title,  
       genre: movieGenre,
       rating: rating,
       description: description, 
       imageUrl: imageUrl,
       userId: req.user
     });
     movie.save()
     .then(result => {
       //log success and redirect to admin products
       console.log('Created Movie');
       res.redirect('/add-item');
     })
     .catch(err => {
       console.log(`postAddProduct - switch(movie) catch: ${err}`);
       return res.status(422).render('admin/edit-product', {
         pageTitle: 'Add Item',
         path: '/add-item',
         editing: false,
         user: req.user.username,
         isAuthenticated: false,
         errorMessage: [],
         hasError: false,
         product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
         validationErrors: errors.array()
       })
     });
     break;
   case "game":
     const game = new Game({
       title: title,  
       category: category,
       description: description, 
       imageUrl: imageUrl,
       userId: req.user
     });
     game.save()
     .then(result => {
       //log success and redirect to admin products
       getCategories();
       console.log('Created Game');
       res.redirect('/add-item');
     })
     .catch(err => {
       console.log(`postAddProduct - switch(game) catch: ${err}`);
       return res.status(422).render('admin/edit-product', {
         pageTitle: 'Add Item',
         path: '/add-item',
         editing: false,
         user: req.user.username,
         isAuthenticated: false,
         errorMessage: [],
         hasError: false,
         product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
         validationErrors: errors.array()
       })
     });
     break;
     default: 
     console.log(`postAddProduct - switch(default): ${itemType}`);
       return res.status(422).render('admin/edit-product', {
         pageTitle: 'Add Item',
         path: '/add-item',
         editing: false,
         user: req.user.username,
         isAuthenticated: false,
         errorMessage: [],
         hasError: false,
         product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
         validationErrors: []
       })
}

}

exports.postEditItem = (req, res, next) => {
  //gather updated product info
  const itemId = req.body.itemId;
  const itemType= req.body.itemType;
  const updatedTitle = req.body.title;
  const updatedAuthor = req.body.author;
  let updatedBookGenre = req.body.bookGenre;
  let updatedMovieGenre = req.body.movieGenre;
  const updatedRating = req.body.rating;
  let updatedCategory = req.body.category;
  const image = req.file;
  const updatedDescription = req.body.description;
  const newBookGenre = req.body.newBookGenre;
  const newMovieGenre = req.body.newMovieGenre;
  const newCategory = req.body.newCategory;
  let genre = '';
  
console.log(`postEditItem updatedBookGenre: ${updatedBookGenre}`)

  //if it's a new book genre, make it genre
  if(updatedBookGenre == "newGenre"){
    updatedBookGenre = newBookGenre;
  }
   //if it's a new movie genre, make it genre
   if(updatedMovieGenre == "newGenre"){
    updatedMovieGenre = newMovieGenre;
  }
  //if it's a new category, make it category
  if(updatedCategory == "newCategory"){
    category = newCategory;
  }

  //validation:
  const v_errs = validationResult(req);

  
  if(!v_errs.isEmpty())
  {
    let errMsgs = [];
    let errIds = [];

    for(err of v_errs.array())
    {
      errMsgs.push(err.msg);
      errIds.push(err.params);
    }

    
    if(itemType == "book")
    {
      genre = updatedBookGenre;
    }
    else if(itemType == "movie")
    {
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
      item: {title: updatedTitle, author: updatedAuthor, genre: genre, rating: updatedRating, category: updatedCategory, description: updatedDescription, imageUrl: req.body.oldImgURL, _id: itemId},
      validationErrors: []
    })
  }
  //locate existing product in db
  switch(itemType){
    case "book": 
      Book.findById(itemId)
      .then(book => {
        if(book.userId.toString() !== req.user._id.toString()){
          return res.redirect('/');
        }
        //update book details
        book.title = updatedTitle;
        book.author = updatedAuthor;
        book.genre = updatedBookGenre;
        book.description = updatedDescription;
        if(image){
          book.imageUrl = image.filename;
        }
        return book.save()
          .then(result => {
            //log the success and redirect to admin products  
            console.log('UPDATED BOOK!');
            res.redirect('/my-library');
          })
          .catch(err => {
            res.redirect('/my-library');
            console.log(`postEditItem - book - Err: ${err}`)
          });
      })
      .catch(err => {
        //res.redirect('/admin/edit-product/:itemId');
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('postEditItem - book - Err: ${err}');
        return next(error);
      });
      break;
    case "movie": 
    Movie.findById(itemId)
      .then(movie => {
        if(movie.userId.toString() !== req.user._id.toString()){
          return res.redirect('/');
        }
        //update movie details
        movie.title = updatedTitle;
        movie.rating = updatedRating;
        movie.genre = updatedMovieGenre;
        movie.description = updatedDescription;
        if(image){
          movie.imageUrl = image.filename;
        }
        return movie.save()
          .then(result => {
            //log the success and redirect to admin products  
            console.log('UPDATED MOVIE!');
            res.redirect('/my-library');
          })
          .catch(err => {
            res.redirect('/my-library');
            console.log(`postEditItem - movie - Err: ${err}`)
          });
      })
      .catch(err => {
        //res.redirect('/admin/edit-product/:itemId');
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('postEditItem - movie - Err: ${err}');
        return next(error);
      });
      break;
    case "game": 
    Game.findById(itemId)
      .then(game => {
        if(game.userId.toString() !== req.user._id.toString()){
          return res.redirect('/');
        }
        //update game details
        game.title = updatedTitle;
        game.category = updatedCategory;
        game.description = updatedDescription;
        if(image){
          game.imageUrl = image.filename;
        }
        return game.save()
          .then(result => {
            //log the success and redirect to admin products  
            console.log('UPDATED GAME!');
            res.redirect('/my-library');
          })
          .catch(err => {
            res.redirect('/my-library');
            console.log(`postEditItem - game - Err: ${err}`)
          });
      })
      .catch(err => {
        //res.redirect('/admin/edit-product/:itemId');
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('postEditItem - game - Err: ${err}');
        return next(error);
      });
      break;
    default: 
      console.log(`postEditItem - switch(default): ${itemType}`);
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Edit Item',
          path: '/edit-item',
          editing: true,
          user: req.user.username,
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
          validationErrors: []
        })
      }
};



async function getBookGenres(){
  await Book.find()
    .distinct("genre")
    .then(genres => {
      let genresLength = genres.length;
      for(let i=0; i < genresLength; i++){
        if(!bookGenres.includes(genres[i])){
          bookGenres.push(genres[i]);
        }
      }
      bookGenres.sort();
    })      
    .catch(err => {
      console.log`Error getGenres-Book ${err}`;
    })
    return;
}

async function getMovieGenres(){
await Movie.find().distinct("genre")
  .then(genres => {
    let genresLength = genres.length;
    for(let i=0; i < genresLength; i++){
      if(!movieGenres.includes(genres[i])){
        movieGenres.push(genres[i]);
      }
    }
    movieGenres.sort();
  })
.catch(err => {
  console.log`Error getGenres-Movie ${err}`;
})
}


async function getCategories(){
  await Game.find().distinct("category")
    .then(categories => {
      gameCategories = categories;
      gameCategories.sort();
    })
}

exports.postAddFavorite = (req, res, next) => {
  
  const user = req.user;
  const itemType = req.body.itemType.toString();
  const id = req.body.id.toString();
  let msg;
  User.findById(user)
    .then(user => {
      //is it already in Favorites?
      switch(itemType){
        case "book":
          if(!user.bookLib.favorites.includes(id)){
            user.bookLib.favorites.push(id);
            msg = "Book added to bookLib.favorites.";}
            else{
              let index = user.bookLib.favorites.findIndex(index => {
                return index == id;
              });
              console.log(`index: ${index}`);
              user.bookLib.favorites.splice(index, 1);
              msg = "Book removed from bookLib.favorites.";
            }
            user.save()
              .then(results => {
                console.log(msg);
                console.log(`${user.username}.bookLib: ${user.bookLib}`);
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log('postAddFavorites user.save (book) error: ${err}');
                return next(error);
              })
            res.redirect('/my-library#books');
            
          break;
        case "movie":
          if(!user.movieLib.favorites.includes(id)){
            user.movieLib.favorites.push(id);
            console.log("Movie added to movieLib.favorites");
          } else {
            let index = user.movieLib.favorites.findIndex(index => {
              return index == id;
            });
              user.movieLib.favorites.splice(index, 1);
              msg = "Movie removed from movieLib.favorites.";
          }
            user.save()
              .then(results => {
                console.log(`${user.username}.movieLib: ${user.movieLib}`);
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log('postAddFavorites user.save (movie) error: ${err}');
                return next(error);
              })

          res.redirect('/my-library#movies');
          break;
        case "game":
          if(!user.gameLib.favorites.includes(id)){
            user.gameLib.favorites.push(id);
            msg = "Game added to gameLib.favorites.";
          } else {
            let index = user.gameLib.favorites.findIndex(index => {
              return index == id;
            });
              user.gameLib.favorites.splice(index, 1);
              msg = "Game removed from gameLib.favorites.";
          }
            user.save()
              .then(results => {
                console.log(msg);
            console.log(`${user.username}.gameLib: ${user.gameLib}`);
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log('postAddFavorites user.save (game) error: ${err}');
                return next(error);
              })
          
          res.redirect('/my-library#games');
          break;
        default:
          
      }
    })

}

// Add Review to DB
exports.submitReview = (req, res, next) => {
  const reviewText = req.body.fullReview;
  const itemId = req.body.itemId;
  const type = req.body.type;

  const newReview = new Review({
    reviewText: reviewText,
    contentId: itemId,
    date: Date.now(),
    userId: req.user._id,
    username: req.user.username
  });

  console.log(itemId.toString())

  newReview
    .save()
    .then(result => {
      console.log('Submitted Review!');
      res.redirect(`/details/${itemId.toString()}?type=${type}`)
    })

}

// Display Edit Review page
exports.getEditReview = (req, res, next) => {
  const itemId = req.body.itemId;
  const type = req.body.type;
  const reviewText = req.body.reviewText;
  const title = req.body.itemTitle;
  const reviewId = req.body.reviewId;

  res.render('general/edit-review', {
      pageTitle: `Edit Review | Hermit Habitat`,
      path: '/edit-review',
      itemId: itemId,
      type: type,
      reviewText: reviewText,
      title: title,
      reviewId: reviewId
  })
}

// Update Review in DB
exports.updateReview = (req, res, next) => {
  const itemId = req.body.itemId;
  const type = req.body.type;
  const reviewText = req.body.reviewText;
  const reviewId = req.body.reviewId;

  Review.findById(reviewId)
    .then(review => {
      if (review.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }

      review.reviewText = reviewText;
      review.date = Date.now();

      return review.save()
        .then(result => {
        console.log('Updated Item')
        res.redirect(`/details/${itemId}?type=${type}`)
        })
        .catch(err => {
            console.log(err)
      })
    })
}

// Delete Review in DB
exports.postDelReview = (req, res, next) => {
  const reviewId = req.body.reviewId;
  const itemId = req.body.itemId;
  const type = req.body.type;

  Review.deleteOne({
    _id: reviewId,
    userId: req.user._id
  })
  .then(result => {
    console.log('Review Deleted.');
    res.redirect(`/details/${itemId}?type=${type}`)
  }).catch(err => {
      console.log(err);
    })
}