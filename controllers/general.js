//import models
const Book = require('../models/book');
const Movie = require('../models/movie');
const Game = require('../models/game');
const User = require('../models/user');
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

// NEED FIX Dummy code, delete once database content is added
const moviesObjectArray = [
  {
    title: "The Eternals",
    rating: "6.8 / 10",
    genre: "Action",
    description: `The Eternals, a race of immortal beings with superhuman powers who have secretly lived on Earth for thousands of years, reunite to battle the evil Deviants.`,
    imageUrl: "images/eternals_poster.jpg"
  },
  {
    title: "Dune",
    rating: "8.2 / 10",
    genre: "Sci-Fi",
    description: `Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.`,
    imageUrl: "images/dune_poster.jpg"
  },
  {
    title: "The Suicide Squad",
    rating: "7.3 / 10",
    genre: "Action",
    description: `The government sends the most dangerous supervillains in the world -- Bloodsport, Peacemaker, King Shark, Harley Quinn and others -- to the remote, enemy-infused island of Corto Maltese. Armed with high-tech weapons, they trek through the dangerous jungle on a search-and-destroy mission, with only Col. Rick Flag on the ground to make them behave.`,
    imageUrl: "images/thesuicidesquad_poster.jpg"
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
        content: moviesObjectArray
      });
    });
};

// NEED FIX Dummy code, delete once database content is added
const gamesObjectArray = [
  {
    title: "The Settlers of Catan",
    category: "Strategy, Negotiation",
    description: `The players in the game represent settlers establishing settlements on the island of Catan. Players build settlements, cities, and roads to connect them as they settle the island. ... On each player's turn, two six-sided dice are rolled to determine which hexes produce resources.`,
    imageUrl: "images/catan.jpg"
  },
  {
    title: "One Night Ultimate Werewolf",
    category: "Party, Strategy",
    description: `One Night Ultimate Werewolf Daybreak is a fast game for 3-7 players where everyone gets a role: The cunning Alpha Wolf, the powerful Witch, the helpful Apprentice Seer, or others, each with a special ability. In the course of a single morning, your village will decide who among them is a werewolf. because all it takes is finding one werewolf to win!`,
    imageUrl: "images/ultimatewerewolf.jpg"
  },
  {
    title: "7 Wonders",
    category: "Strategy",
    description: `7 Wonders is a card drafting game that is played using three decks of cards featuring depictions of ancient civilizations, military conflicts, and commercial activity. The game is highly regarded, being one of the highest rated games on the board game discussion website BoardGameGeek.`,
    imageUrl: "images/7wonders.jpg"
  }
]


// Get All Games and render
exports.getGames = (req, res, next) => {
  Game.find()
    .then(games => {
      res.render('general/games', {
        pageTitle: 'Games | Hermit Habitat',
        path: '/games',
        // Swap gamesObjectArray for games when db content is available
        content: gamesObjectArray
      });
    });
};

// NEED FIX Dummy code, delete once database content is added
const booksObjectArray = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Improvement",
    description: `Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.`,
    imageUrl: "images/atomichabits.jpg"
  },
  {
    title: "To Kill A Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    description: `The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic. Today it is regarded as a masterpiece of American literature.`,
    imageUrl: "images/mockingbird.jpg"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Thriller",
    description: `While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.`,
    imageUrl: "images/thedavincicode.jpg"
  }
]

// Get All Books and render
exports.getBooks = (req, res, next) => {
  Book.find()
    .then(books => {
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
    case game:
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
    case movie:
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

exports.postAddItem = (req, res, next) => {
  //gather the info from the form
  const itemType= req.body.itemType;
  const title = req.body.title;
  const author = req.body.author;
  let bookGenre = req.body.bookGenre;
  let movieGenre = req.body.movieGenre;
  const rating = req.body.rating;
  let category = req.body.category;
  const image = req.file;
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
  await Book.find().distinct("genre")
    .then(genres => {
      let genresLength = genres.length;
      for(let i=0; i < genresLength; i++){
        if(!bookGenres.includes(genres[i])){
          bookGenres.push(genres[i]);
        }
      }
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
  })
.catch(err => {
  console.log`Error getGenres-Movie ${err}`;
})
}


async function getCategories(){
  await Game.find().distinct("category")
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
          user: req.user
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
              let index = user.bookLib.favorites.findIndex(index => index == parseInt(id));
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
            res.redirect('/my-library');
            
          break;
        case "movie":
          if(!user.movieLib.favorites.includes(id)){
            user.movieLib.favorites.push(id);
            user.save()
              .then(results => {
                console.log("Movie added to movieLib.favorites");
            console.log(`${user.username}.movieLib: ${user.movieLib}`);
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log('postAddFavorites user.save (movie) error: ${err}');
                return next(error);
              })
          }
          // res.redirect('/my-library');
          break;
        case "game":
          if(!user.gameLib.favorites.includes(id)){
            user.gameLib.favorites.push(id);
            user.save()
              .then(results => {
                console.log("Game added to gameLib.favorites");
            console.log(`${user.username}.gameLib: ${user.gameLib}`);
              })
              .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                console.log('postAddFavorites user.save (game) error: ${err}');
                return next(error);
              })
          }
          // res.redirect('/my-library');
          break;
        default:
          
      }
    })

}