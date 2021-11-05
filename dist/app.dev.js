"use strict";

//NANCI NEWELL
// Mikhail!
// Tyson: the somewhat sufficient
//Imported pgks
var mongoose = require('mongoose');

var csurf = require('csurf');

var expressSession = require('express-session');

var mongodbSession = require('connect-mongodb-session');

var express = require('express');

var multer = require('multer');

var cors = require('cors'); //vars


require('dotenv').config();

var PORT = process.env.PORT || 3005; //Server env | localhost

var MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://cse341Team1:dyJ2wI1RO5Sa4b5m@cluster0.s0nia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var SESSION_SECRET = process.env.SESSION_SECRET || 'a really long session secret string that we need to change to use a .env var at some point'; //NEED FIX -need to set up var in heroku app
//test.env

var test_var = process.env.TEST_VAR || "testvarnot set";
console.log(test_var); //imported controllers
//...
//imported models
//...
//import routes

var generalRoutes = require('./routes/general'); //...

/*** UNCOMMENT AFTER SET UP MONGODB AND THE SERVER SESSIONS COLLECTION
//set up session storage on mongodb database
const sesionDB = new expressSession({
  uri: MONGODB_URL,
  collection: 'server_sessions'
});
****/
//set up csurf


var csurfMiddleware = csurf(); //Multer Setup

var multerStorage = multer.diskStorage({
  destination: function destination(req, file, cb_func) {
    //could do error checking things here
    var err = null; //pass result back to multer cb_func

    cb_func(err, './public/images');
  },
  filename: function filename(req, file, cb_func) {
    //could do error checking/etc stuff here
    var err = null; //pass result back to cb_func, set file name to curr time number + original name

    cb_func(err, Date.now() + '-' + file.originalname);
  }
}); //END MULTER STORAGE OBJ
//create multer filter for filtering allowed image file types

var imgFileFilter = function imgFileFilter(req, file, cb_func) {
  //can do err checking here
  var err = null; //filter img types

  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    //accept the file
    cb_func(err, true);
  } else {
    //reject all other file types
    cb_func(err, false);
  }
}; //END MULTER IMGFILEFILTER FUNC
//init app


var app = express(); //set view engine

app.set('view engine', 'ejs'); //set app to use multer

app.use(multer({
  storage: multerStorage,
  fileFilter: imgFileFilter
}).array('imageUpload', 10) //this allows for uploading multiple images at once (instead of .single()), <input> el. will need to be named 'imageUploader'
);
/******* CAN UN COMMENT AFTER MONGODB IS SET UP AND SESSION DB COLLECTION IS CREATED
//set up server sessions
app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false, //only make saves when there is a change
  saveUninitialized: false,
  //cookie: {maxAge: ....} //can set this if we feel we need to
  store: sesionDB
})
);
*/
//NEED FIX -  uncomment after sessions is intergrated

/*
//set up to use csurf middleware
app.use(csurfMiddleware);
*/

var User = require('./models/user'); //set up/attach user to req obj


app.use(function (req, res, next) {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id).then(function (user) {
    req.user = user;
    next();
  })["catch"](function (err) {
    return console.log(err);
  });
}); //attach common items to locals so .ejs can use them (saves from doing in each ctrl'er middleware)

app.use(function (req, res, next) {
  //NEED FIX -  uncomment after sessions is intergrated

  /*
  //check user logged in
  res.locals.isLoggedin = req.sesion.isLoggedin;
  if(req.session.user)
  {
    //set user vars
    //eg.: userImg
  }
  else
  {
    //set defaults for user inputs
    //eg: userImg = default/notlogged in img
  }
  */
  //set default error message
  res.locals.error_msg = "";
  res.locals.msg = ""; //NEED FIX -  uncomment after sessions is intergrated

  /*
  //attach csurf token
  res.locals.csrfToken = req.csrfToken();
  */

  next();
}); //set up and use routes

app.use(generalRoutes); //...
//add error 500 error catcher
//app.use('/500', error_ctrl.err_500)
//set up 404 catch all
//app.use(err_ctrl.err_404)
//special error handling (ie. when a middleware calls next(err_obj) )

app.use(function (err, req, res, next) {
  console.log("Special error handler:" + err); // res.redirect('/500');
}); //setup CORS (allow other sites to access ours)
//cors options

var corsOptions = {
  origin: "https://cse341team1.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
var options = {
  autoIndex: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
}; //set up Mongoose

mongoose.connect(MONGODB_URL, options).then(function (result) {
  app.listen(PORT, function () {
    return console.log("App listening on port#: " + PORT);
  });
})["catch"](function (err) {
  return console.log("Error starting app: " + err);
}); //NEED FIX -- delete code below after MongoDB is set up and can use above commented-out code

app.listen(PORT, function () {
  return console.log("App listening on port#: " + PORT);
});