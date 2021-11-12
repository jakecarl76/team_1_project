"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["Special error handler: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//NANCI NEWELL
// Mikhail!
// Tyson: the somewhat sufficient
// Okay, am I doing this correctly?
//Imported pgks & vars
// const PORT = process.env.PORT || 3005; //Server env | 
var path = require('path');

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var expressSession = require('express-session');

var mongodbSession = require('connect-mongodb-session')(expressSession);

var csrf = require('csurf');

var flash = require('connect-flash');

var multer = require('multer');

var cors = require('cors');

var User = require('./models/user');

var app = express();

require('dotenv').config();

var PORT = process.env.PORT || 3005; //Server env | localhost

var MONGODB_URL = process.env.MONGODB_URL || "MONGODB_URL var not set"; //NEED FIX - need to set up env var in heroku app

var SESSION_SECRET = process.env.SESSION_SECRET || 'a really long session secret string that we need to change to use a .env var at some point'; //NEED FIX -need to set up var in heroku app
//Multer Setup

var multerStorage = multer.diskStorage({
  destination: function destination(req, file, cb_func) {
    //could do error checking things here
    var err = null; //pass result back to multer cb_func

    cb_func(err, './public/images');
  },
  filename: function filename(req, file, cb_func) {
    //could do error checking/etc stuff here
    var err = null; //pass result back to cb_func, set file name to curr time number + original name

    cb_func(err, Date.now().toString() + '-' + file.originalname);
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
//set up session storage on mongodb database


var store = new mongodbSession({
  uri: MONGODB_URL,
  collection: 'server_sessions'
}); //set up csurf

var csrfProtection = csrf(); //set view engine

app.set('view engine', 'ejs');
app.set('views', 'views'); //import routes

var generalRoutes = require('./routes/general');

var authRoutes = require('./routes/auth');

var libRoutes = require('./routes/lib');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/images', express["static"](path.join(__dirname, 'images'))); //set app to use multer

app.use(multer({
  storage: multerStorage,
  fileFilter: imgFileFilter
}).single('image') //we are only using one input field, so only 1 image will ever be uploaded at a time -- Nanci
//.array('imageUpload', 10) //this allows for uploading multiple images at once (instead of .single()), <input> el. will need to be named 'imageUploader'
); //set up server sessions

app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false,
  //only make saves when there is a change
  saveUninitialized: false,
  //cookie: {maxAge: ....} //can set this if we feel we need to
  store: store
})); //set up to use csurf middleware

app.use(csrfProtection); //set up/attach user to req obj

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
}); //attach csurf token

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
}); //attach common items to locals so .ejs can use them (saves from doing in each ctrl'er middleware)

app.use(function (req, res, next) {
  //check user logged in
  res.locals.isLoggedin = req.session.isLoggedin;

  if (req.session.user) {//set user vars
    //eg.: userImg
  } else {} //set defaults for user inputs
    //eg: userImg = default/notlogged in img
    //set default error message


  res.locals.error_msg = "";
  res.locals.msg = "";
  next();
}); //set up and use routes

app.use(generalRoutes);
app.use(authRoutes);
app.use(libRoutes); // console.log(test_var);
//special error handling (ie. when a middleware calls next(err_obj) )

app.use(function (err, req, res, next) {
  console.log(_templateObject(), err); // res.redirect('/500');
}); //setup CORS (allow other sites to access ours)
//cors options

var corsOptions = {
  origin: "https://cse341team1.herokuapp.com/",
  optionsSuccessStatus: 200
}; //set up 404 catch all
//app.use(err_ctrl.err_404)

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
});