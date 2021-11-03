//Imported pgks
const mongoose = require('mongoose');
const csurf = require('csurf');
const expressSession = require('express-session');
const mongodbSession = require('connect-mongodb-session');
const express = require('express');
const multer = require('multer');
const cors = require('cors');


//vars
require('dotenv').config();
const PORT = process.env.PORT || 3005; //Server env | localhost
const MONGODB_URL = process.env.MONGODB_URL || "MONGODB_URL var not set";//NEED FIX - need to set up env var in heroku app
const SESSION_SECRET = process.env.SESSION_SECRET || 'a really long session secret string that we need to change to use a .env var at some point';//NEED FIX -need to set up var in heroku app

//test.env
const test_var = process.env.TEST_VAR || "testvarnot set";

console.log(test_var);

//imported controllers
//...

//imported models
//...

//import routes
const generalRoutes = require('./routes/general');
//...

/*** UNCOMMENT AFTER SET UP MONGODB AND THE SERVER SESSIONS COLLECTION
//set up session storage on mongodb database
const sesionDB = new expressSession({
  uri: MONGODB_URL,
  collection: 'server_sessions'
});
****/

//set up csurf
const csurfMiddleware = csurf();

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
    cb_func(err, (Date.now() + '-' + file.originalname));
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


//init app
const app = express();

//set view engine
app.set('view engine', 'ejs');

//set app to use multer
app.use(multer({
  storage: multerStorage,
  fileFilter: imgFileFilter
})
.array('imageUpload', 10) //this allows for uploading multiple images at once (instead of .single()), <input> el. will need to be named 'imageUploader'
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

//NEED FIX - must create user model, mongodb collection for user, etc.
//set up/attach user to req obj
app.use((req, res, next) => {
  //check if use logged in

  //find user
    //check user found
    //attach to req obj
    //req.user = user
    next();
});

//attach common items to locals so .ejs can use them (saves from doing in each ctrl'er middleware)
app.use( (req, res, next) => {
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
  res.locals.msg = "";

  //NEED FIX -  uncomment after sessions is intergrated
  /*
  //attach csurf token
  res.locals.csrfToken = req.csrfToken();
  */
  next();
});

//set up and use routes
app.use(generalRoutes);
//...

//add error 500 error catcher
//app.use('/500', error_ctrl.err_500)

//set up 404 catch all
//app.use(err_ctrl.err_404)

//special error handling (ie. when a middleware calls next(err_obj) )
app.use((err, req, res, next) => {
  console.log("Special error handler:" + err)
 // res.redirect('/500');
});

//setup CORS (allow other sites to access ours)
//cors options
const corsOptions = {
  origin: "",//NEED FIX - Uncomment after establish heroku app, place app url here, eg: "https://cse-341-app-01.herokuapp.com/"
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

/**** //NEED FIX - Uncomment after setup MongoDB
//set up Mongoose
mongoose.connect(MONGODB_URL)
.then(result => {
  app.listen(PORT, () => console.log("App listening on port#: " + PORT));
})
.catch( err => console.log("Error starting app: " + err));

*/

//NEED FIX -- delete code below after MongoDB is set up and can use above commented-out code
app.listen(PORT, () => console.log("App listening on port#: " + PORT));