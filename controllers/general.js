//import models
const Book = require('../models/book')
const Movie = require('../models/movie')
const Game = require('../models/game')

//get index
exports.getIndex = (req, res, next) => {
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};

exports.getAddItem= (req, res, next) => {
  //send to add item page with page and authentication info
  res.render('admin/edit-item', {
    pageTitle: 'Add Item',
    path: '/add-item',
    editing: false,
    //user: req.user.name,    Uncomment out after login working
    errorMessage: [],
    hasError: false,
    validationErrors: []
  });
}

// NEED FIX Dummy code, delete once database content is added
const moviesObjectArray = [
  {
    title: "The Eternals",
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
  },
  {
    title: "The Suicide Squad",
    rating: "7.3",
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




/*cannot test until My Items page is created*/
//get Edit Item
exports.getEditItem = (req, res, next) => {
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
      displayEditItem();
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
  res.render('/edit-item', {
    pageTitle: 'Edit Item',
    path: '/edit-item',
    editing: editMode,
    itemType: itemType,
    item: item,
    hasError: false,
    //user: req.user.name,    Uncomment out once user login working
    errorMessage: "",
    validationErrors: []
  })
}

exports.postAddItem = (req, res, next) => {
  //gather the info from the form
console.log(req.body);

  const itemType= req.body.itemType;
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const rating = req.body.rating;
  const category = req.body.category;
  const image = req.file;
  const description = req.body.description;

  //image validation
  if(!image){
    return res.status(422).render('admin/edit-item', {
      pageTitle: 'Add Item',
      path: '/add-item',
      editing: false,
      //user: req.user.name,      Uncomment out once login implemented
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

  const imageUrl = image.path;

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
        res.redirect('/admin/products');
      })
      .catch(err => {
        console.log(`postAddItem - switch(book) catch: ${err}`);
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          // user: req.user.name,      Uncomment out once login implemented
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
        userId: null //req.user
      });
      movie.save()
      .then(result => {
        //log success and redirect to admin products
        console.log('Created Movie');
        res.redirect('/admin/products');
      })
      .catch(err => {
        console.log(`postAddProduct - switch(movie) catch: ${err}`);
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          // user: req.user.name,      Uncomment out once login implemented
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
        userId: null //req.user
      });
      game.save()
      .then(result => {
        //log success and redirect to admin products
        console.log('Created Game');
        res.redirect('/admin/products');
      })
      .catch(err => {
        console.log(`postAddProduct - switch(game) catch: ${err}`);
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          // user: req.user.name,      Uncomment out once login implemented
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
          // user: req.user.name,      Uncomment out once login implemented
          isAuthenticated: false,
          errorMessage: [],
          hasError: false,
          product: {title: title, author: author, genre: genre, rating: rating, category: category, description: description},
          validationErrors: []
        })
 }

}