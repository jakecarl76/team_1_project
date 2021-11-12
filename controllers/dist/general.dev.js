"use strict";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Error getAddItem-Book ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Error getAddItem-Movie ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//import modules
//...
//import models
var Book = require('../models/book');

var Movie = require('../models/movie');

var Game = require('../models/game');

var allGenres = [];
var gameCategories = []; //get index

exports.getIndex = function (req, res, next) {
  getGenres();
  getCategories();
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};

exports.getAddItem = function (req, res, next) {
  res.render('admin/edit-item', {
    pageTitle: 'Add Item',
    path: '/add-item',
    editing: false,
    user: req.user.username,
    errorMessage: [],
    hasError: false,
    validationErrors: [],
    genres: allGenres,
    categories: gameCategories
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
  }
  /*NEED TO ADD ITEM TYPE TO EDIT LINK ON MY ITEMS*/

  /*NEED TO ADD ITEM ID TO EDIT LINK ON MY ITEMS*/
  //gather item id and type from params


  var itemId = req.params.itemId;
  var itemType = req.params.itemType.toString(); //locate product

  switch (itemType) {
    case "book":
      Book.findById(itemId).then(function (item) {
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
    user: req.user.name,
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


  var imageUrl = image.path; //save item based on type

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
        getGenres();
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
        console.log('Created Movie');
        getGenres();
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
        console.log('Created Game');
        getCategories();
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
  var genreList = [];
  Book.find().distinct("genre").then(function (genres) {
    var genresLength = genres.length;

    for (var i = 0; i < genresLength; i++) {
      genreList.push(genres[i]);
    }
  }).then(Movie.find().distinct("genre").then(function (genres) {
    var genresLength = genres.length;

    for (var i = 0; i < genresLength; i++) {
      if (!genreList.includes(genres[i])) {
        genreList.push(genres[i]);
      }
    }

    allGenres = genreList;
    console.log("getGenres- allGenres: ".concat(allGenres));
    return;
  }))["catch"](function (err) {
    console.log(_templateObject(), err);
  })["catch"](function (err) {
    console.log(_templateObject2(), err);
  });
  return;
}

function getCategories() {
  Game.find().distinct("category").then(function (categories) {
    // let categoriesLength = categories.length;
    // for(let i=0; i < categoriesLength; i++){
    //   gameCategories.push(categories[i]);
    // }
    gameCategories = categories;
    console.log("getCategories- gameCategories: ".concat(gameCategories));
  });
}