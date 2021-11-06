"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["Error: postAddItem errors[] - ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//import modules
//...
//import models
//...
//get index
exports.getIndex = function (req, res, next) {
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};

exports.getAddItem = function (req, res, next) {
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
};
/*cannot test until My Items page is created*/
//get Edit Item


exports.getEditItem = function (req, res, next) {
  //Is the user in edit mode? Only allow access if in edit mode.
  var editMode = req.query.edit; //if not in edit mode, redirect Home

  if (!editMode) {
    return res.redirect('/');
  }
  /*NEED TO ADD ITEM TYPE TO EDIT LINK ON MY ITEMS*/

  /*NEED TO ADD ITEM ID TO EDIT LINK ON MY ITEMS*/
  //gather item id and type from params


  var itemId = req.params.itemId;
  var itemType = req.params.type; //locate product

  switch (itemType) {
    case book:
      Book.findById(itemId).then(function (item) {
        displayEditItem(item, itemType, res, req);
      })["catch"](function (err) {
        var error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:book catch');
        return next(error);
      });
      break;

    case game:
      Game.findById(itemId).then(function (item) {
        displayEditItem(item, itemType, res, req);
      })["catch"](function (err) {
        var error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:game catch');
        return next(error);
      });
      break;

    case movie:
      Movie.findById(itemId).then(function (item) {
        displayEditItem(item, itemType, res, req);
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


function displayEditItem(item, itemType, res, req) {
  //if no item, redirect Home
  if (!item) {
    return res.redirect('/');
  } //if product found, send to edit product with product info


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
  });
}

exports.postAddItem = function (req, res, next) {
  //gather the info from the form
  var itemType = req.body.item - type;
  var title = req.body.title;
  var author = req.body.author;
  var genre = req.body.genre;
  var rating = req.body.rating;
  var category = req.body.category;
  var image = req.file;
  var description = req.body.description; //image validation

  if (!image) {
    return res.status(422).render('admin/edit-item', {
      pageTitle: 'Add Item',
      path: '/add-item',
      editing: false,
      //user: req.user.name,      Uncomment out once login implemented
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
  } //form validation


  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(_templateObject(), errors.array());
    return res.status(422).render('admin/edit-item', {
      pageTitle: 'Add Item',
      path: '/add-item',
      editing: false,
      hasError: true,
      // user: req.user.name,      Uncomment out once login implemented
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
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
  }

  var imageUrl = image.path; //save item based on type

  switch (itemType) {
    case "book":
      var _book = new Book({
        title: title,
        author: author,
        genre: genre,
        description: description,
        imageUrl: imageUrl,
        userId: null //req.user

      });

      _book.save().then(function (result) {
        //log success and redirect to admin products
        console.log('Created Book');
        res.redirect('/admin/products');
      })["catch"](function (err) {
        console.log("postAddProduct - switch(book) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          // user: req.user.name,      Uncomment out once login implemented
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
        userId: null //req.user

      });

      _movie.save().then(function (result) {
        //log success and redirect to admin products
        console.log('Created Movie');
        res.redirect('/admin/products');
      })["catch"](function (err) {
        console.log("postAddProduct - switch(movie) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          // user: req.user.name,      Uncomment out once login implemented
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
        userId: null //req.user

      });

      _game.save().then(function (result) {
        //log success and redirect to admin products
        console.log('Created Game');
        res.redirect('/admin/products');
      })["catch"](function (err) {
        console.log("postAddProduct - switch(game) catch: ".concat(err));
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Item',
          path: '/add-item',
          editing: false,
          // user: req.user.name,      Uncomment out once login implemented
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
        // user: req.user.name,      Uncomment out once login implemented
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