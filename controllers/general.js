//import models
const Book = require('../models/book')
const Movie = require('../models/movie')
const Game = require('../models/game')

let allGenres = [];
let gameCategories = [];

//get index
exports.getIndex = (req, res, next) => {
  getGenres();
  getCategories();
  console.log(`genres: ${allGenres}; categories: ${gameCategories}`);
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};

exports.getAddItem= (req, res, next) => {
  getGenres().then(() => {
    console.log`getAddItem - allGenres: ${allGenres}`;
    res.render('admin/edit-item', {
      pageTitle: 'Add Item',
      path: '/add-item',
      editing: false,
      user: req.user.username,
      itemType: null,
      item: null,
      genres: allGenres,
      categories: gameCategories,
      errorMessage: [],
      hasError: false,
      validationErrors: [],
      categories: gameCategories
    })
  })
}

// Get All Movies and render
exports.getMovies = (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('general/movies', {
        pageTitle: 'Movies | Hermit Habitat',
        path: '/movies',
        content: movies
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
        content: games
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
        content: books
      });
    });
};


// Get Movie Randomizer
exports.getMovieRandomizer = (req, res, next) => {
  Movie.find()
    .then(movies => {
      const genreIteration = [];

      for (let movie of movies) {
        genreIteration.push(movie.genre);
      }
      const genre = genreIteration.filter((value, index) => genreIteration.indexOf(value) === index)

      res.render('general/randomizer', {
        pageTitle: 'Movie Randomizer | Hermit Habitat',
        path: '/randomizer',
        content: movies,
        genres: genre,
        hasMovie: false
      });
    });
};

// Post Movie Randomizer
exports.displayRandomMovie = (req, res, next) => {
  const genre = req.query.genre;
    Movie.aggregate([
      {
        $match: {
          genre: genre
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
        genre: genre,
        movie: mov[0],
        hasMovie: true
      });
    })
}





/*cannot test until My Items page is created*/
// link to add for edit item: "edit-item/6189b7e12defcea0f68bdc6b/game"
//get Edit Item
exports.getEditItem = (req, res, next) => {
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
        console.log(`case:book- item: ${item}`);
        displayEditItem(item, itemType, editMode, res, req);
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
        console.log(`getEditItem 4`);
        displayEditItem(item, itemType, editMode, res, req);
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
        console.log(`getEditItem 5`);
        displayEditItem(item, itemType, editMode, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:movie catch');
        return next(error);
      });
      break;
    default:
      displayEditItem();
      console.log("getEditItem case: default - Not accepted parameter.")
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
    genres: allGenres,
    categories: gameCategories,
    hasError: false,
    //user: req.user.name,    Uncomment out once user login working
    errorMessage: "",
    validationErrors: []
  })
}

exports.postAddItem = (req, res, next) => {
  //gather the info from the form
  const itemType= req.body.itemType;
  const title = req.body.title;
  const author = req.body.author;
  let genre = req.body.genre;
  const rating = req.body.rating;
  let category = req.body.category;
  const image = req.file;
  const description = req.body.description;
  const newGenre = req.body.newGenre;
  const newCategory = req.body.newCategory;

  //if it's a new genre, make it genre
  if(genre == "newGenre"){
    genre = newGenre;
  }
  //if it's a new category, make it category
  if(category == "newCategory"){
    category = newCategory;
  }

  //image validation
  if(!image){
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
// *** NEED TO ADD VALIDATION, THEN CAN UNCOMMENT THIS OUT
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

  const imageUrl = image.filename;
console.log`postAddItem- image: ${image}`;
  //save item based on type
 switch(itemType){
   case "book": 
      const book = new Book({
        title: title, 
        author: author, 
        genre: genre,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
      });
      book.save()
      .then(result => {
        //log success and redirect to admin products
        getGenres();
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
          product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
          validationErrors: errors.array()
        })
      });
      break;
    case "movie":
      const movie = new Movie({
        title: title,  
        genre: genre,
        rating: rating,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
      });
      movie.save()
      .then(result => {
        //log success and redirect to admin products
        getGenres();
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
  let genre = req.body.genre;
  const rating = req.body.rating;
  let category = req.body.category;
  const image = req.file;
  const description = req.body.description;
  const newGenre = req.body.newGenre;
  const newCategory = req.body.newCategory;

  //if it's a new genre, make it genre
  if(genre == "newGenre"){
    genre = newGenre;
  }
  //if it's a new category, make it category
  if(category == "newCategory"){
    category = newCategory;
  }

  //image validation
  if(!image){
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
// *** NEED TO ADD VALIDATION, THEN CAN UNCOMMENT THIS OUT
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

  const imageUrl = image.filename;
console.log`postAddItem- image: ${image}`;
  //save item based on type
 switch(itemType){
   case "book": 
      const book = new Book({
        title: title, 
        author: author, 
        genre: genre,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
      });
      book.save()
      .then(result => {
        //log success and redirect to admin products
        getGenres();
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
        genre: genre,
        rating: rating,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
      });
      movie.save()
      .then(result => {
        //log success and redirect to admin products
        getGenres();
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
  let updatedGenre = req.body.genre;
  const updatedRating = req.body.rating;
  let updatedCategory = req.body.category;
  const image = req.file;
  const updatedDescription = req.body.description;
  const newGenre = req.body.newGenre;
  const newCategory = req.body.newCategory;

  
// *** Need to add validation
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
        book.genre = updatedGenre;
        book.description = updatedDescription;
        if(image){
          book.imageUrl = image.filename;
        }
        return book.save()
          .then(result => {
            //log the success and redirect to admin products  
            console.log('UPDATED BOOK!');
            res.redirect('/admin/products');
          })
          .catch(err => {
            res.redirect('/admin/edit-item/:itemId');
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
        movie.genre = updatedGenre;
        movie.description = updatedDescription;
        if(image){
          movie.imageUrl = image.filename;
        }
        return movie.save()
          .then(result => {
            //log the success and redirect to admin products  
            console.log('UPDATED MOVIE!');
            res.redirect('/admin/products');
          })
          .catch(err => {
            res.redirect('/admin/edit-item/:itemId');
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
            res.redirect('/admin/products');
          })
          .catch(err => {
            res.redirect('/admin/edit-item/:itemId');
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



async function getGenres(){
  await Book.find().distinct("genre")
    .then(genres => {
      let genresLength = genres.length;
      for(let i=0; i < genresLength; i++){
        if(!allGenres.includes(genres[i])){
          allGenres.push(genres[i]);
        }
      }
    }).then(
      Movie.find().distinct("genre")
      .then(genres => {
        let genresLength = genres.length;
        for(let i=0; i < genresLength; i++){
          if(!allGenres.includes(genres[i])){
            allGenres.push(genres[i]);
          }
        }
      })
      )
      .catch(err => {
        console.log`Error getGenres-Movie ${err}`;
      })
    .catch(err => {
      console.log`Error getGenres-Book ${err}`;
    })
    return;
}


function getCategories(){
  Game.find().distinct("category")
    .then(categories => {
      gameCategories = categories;
    })
}

exports.getMyLibrary = (req, res, next) => {
  let bookList = [];
  let movieList = [];
  let gameList = [];

  Book.find({userId: req.user._id})
  .then(books => {
    bookList = books;
    Movie.find({userId: req.user._id})
    .then(movies => {
      movieList = movies;
      Game.find({userId: req.user._id})
      .then(games => {
        gameList = games;

        //render the page using those items
        res.render('admin/my-library', {
          books: bookList,
          movies: movieList,
          games: gameList,
          pageTitle: 'My Library',
          path: '/my-library',
          user: req.user.name
        });
      })
    })
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    console.log('admin-controller 20');
    return next(error);
  });
}
