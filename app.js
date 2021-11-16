//NANCI NEWELL
// Mikhail!
// Tyson: the somewhat sufficient
// Okay, am I doing this correctly?

//Imported pgks & vars
// const PORT = process.env.PORT || 3005; //Server env | 
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const mongodbSession = require('connect-mongodb-session')(expressSession);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const cors = require('cors');
const User = require('./models/user');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3005; //Server env | localhost
const MONGODB_URL = process.env.MONGODB_URL || "MONGODB_URL var not set";//NEED FIX - need to set up env var in heroku app
const SESSION_SECRET = process.env.SESSION_SECRET || 'a really long session secret string that we need to change to use a .env var at some point';//NEED FIX -need to set up var in heroku app


//Multer Setup
const multerStorage = multer.diskStorage({
  destination: (req, file, cb_func) => {
    //could do error checking things here
    let err = null;

    //pass result back to multer cb_func
    cb_func(err, './public/images');
  },
  filename: (req, file, cb_func) => {
    //could do error checking/etc stuff here
    let err = null;

    //pass result back to cb_func, set file name to curr time number + original name
    cb_func(err, (Date.now().toString() + '-' + file.originalname));
  }
});//END MULTER STORAGE OBJ

//create multer filter for filtering allowed image file types
const imgFileFilter = (req, file, cb_func) => {
  //can do err checking here
  let err = null;

  //filter img types
  if(  file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg')
  {
    //accept the file
    cb_func(err, true);
  }
  else
  {
    //reject all other file types
    cb_func(err, false);
  }
};//END MULTER IMGFILEFILTER FUNC

//set up session storage on mongodb database
const store = new mongodbSession({
  uri: MONGODB_URL,
  collection: 'server_sessions'
});

//set up csurf
const csrfProtection = csrf();

//set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');


//import routes
const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth');
const libRoutes = require('./routes/lib');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

//set app to use multer
app.use(multer({
  storage: multerStorage,
  fileFilter: imgFileFilter
}).single('image') //we are only using one input field, so only 1 image will ever be uploaded at a time -- Nanci

//.array('imageUpload', 10) //this allows for uploading multiple images at once (instead of .single()), <input> el. will need to be named 'imageUploader'
);

//set up server sessions
app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false, //only make saves when there is a change
  saveUninitialized: false,
  //cookie: {maxAge: ....} //can set this if we feel we need to
  store: store
})
);

//set up to use csurf middleware
app.use(csrfProtection);


//set up/attach user to req obj
app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
});

//attach csurf token
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});


//attach common items to locals so .ejs can use them (saves from doing in each ctrl'er middleware)
app.use( (req, res, next) => {

  //check user logged in
  res.locals.isLoggedin = req.session.isLoggedin;
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

  //set default error message
  res.locals.error_msg = "";
  res.locals.msg = "";
  next();
});

//set up and use routes
app.use(generalRoutes);
app.use(authRoutes);
app.use(libRoutes);


// console.log(test_var);

//special error handling (ie. when a middleware calls next(err_obj) )
app.use((err, req, res, next) => {
  console.log`Special error handler: ${err}`;
 // res.redirect('/500');
});

//setup CORS (allow other sites to access ours)
//cors options
const corsOptions = {
  origin: "https://cse341team1.herokuapp.com/",
  optionsSuccessStatus: 200
};

//set up 404 catch all
//app.use(err_ctrl.err_404)

const options = {
  autoIndex: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
};

//set up Mongoose
mongoose.connect(MONGODB_URL, options)
.then(result => {
  app.listen(PORT, () => console.log("App listening on port#: " + PORT));
})
.catch( err => console.log("Error starting app: " + err));
