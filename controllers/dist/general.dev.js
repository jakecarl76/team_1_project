"use strict";

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Error getGenres-Book ", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Error getGenres-Movie ", ""]);

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["getAddItem - allGenres: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//import models
var Book = require('../models/book');

var Movie = require('../models/movie');

var Game = require('../models/game');

var allGenres = [];
var gameCategories = []; //get index

exports.getIndex = function (req, res, next) {
  getGenres();
  getCategories();
  console.log("genres: ".concat(allGenres, "; categories: ").concat(gameCategories));
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};

exports.getAddItem = function (req, res, next) {
  getGenres().then(function () {
    console.log(_templateObject(), allGenres);
    res.render('admin/edit-item', _defineProperty({
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
      validationErrors: []
    }, "categories", gameCategories));
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


exports.getEditItem = function (req, res, next) {
  //Is the user in edit mode? Only allow access if in edit mode.
  var editMode = true; //req.query.edit;
  //if not in edit mode, redirect Home

  if (!editMode) {
    return res.redirect('/');
  } //gather item id and type from params


  var itemId = req.params.itemId;
  var itemType = req.params.itemType.toString(); //locate product

  switch (itemType) {
    case "book":
      Book.findById(itemId).then(function (item) {
        console.log("case:book- item: ".concat(item));
        displayEditItem(item, itemType, editMode, res, req);
      })["catch"](function (err) {
        var error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:book catch');
        return next(error);
      });
      break;

    case game:
      Game.findById(itemId).then(function (item) {
        console.log("getEditItem 4");
        displayEditItem(item, itemType, editMode, res, req);
      })["catch"](function (err) {
        var error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:game catch');
        return next(error);
      });
      break;

    case movie:
      Movie.findById(itemId).then(function (item) {
        console.log("getEditItem 5");
        displayEditItem(item, itemType, editMode, res, req);
      })["catch"](function (err) {
        var error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:movie catch');
        return next(error);
      });
      break;

    default:
      displayEditItem();
      console.log("getEditItem case: default - Not accepted parameter.");
  }
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
    genres: allGenres,
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
        getGenres();
        console.log('Created Book');
        res.redirect('/admin/products');
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
        getGenres();
        console.log('Created Movie');
        res.redirect('/admin/products');
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
        res.redirect('/admin/products');
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

function getGenres() {
  return regeneratorRuntime.async(function getGenres$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Book.find().distinct("genre").then(function (genres) {
            var genresLength = genres.length;

            for (var i = 0; i < genresLength; i++) {
              if (!allGenres.includes(genres[i])) {
                allGenres.push(genres[i]);
              }
            }
          }).then(Movie.find().distinct("genre").then(function (genres) {
            var genresLength = genres.length;

            for (var i = 0; i < genresLength; i++) {
              if (!allGenres.includes(genres[i])) {
                allGenres.push(genres[i]);
              }
            }
          }))["catch"](function (err) {
            console.log(_templateObject3(), err);
          })["catch"](function (err) {
            console.log(_templateObject4(), err);
          }));

        case 2:
          return _context.abrupt("return");

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getCategories() {
  Game.find().distinct("category").then(function (categories) {
    gameCategories = categories;
  });
}