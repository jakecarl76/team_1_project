//import modules
//...
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");

//import models
//...
const User = require('../models/user');


const numHashes = 12;

exports.postSignup = (req, res, next) => {

  //get validation errors
  const vErrs = validationResult(req);
  let errMsgs = [];
  let errIds = [];

  let email = req.body.email;
  let username = req.body.username;

  //check user name
  User.find({username: username})
  .then( users => {
    
    if(users.length > 0)
    {
      errMsgs.push("Sorry, that username is already taken by another users.");
      errIds.push('username');
    }

    return User.find({email: email});
  })
  .then( users => {

    if(users.length > 0)
    {
      errMsgs.push("Sorry, that email is already used by another account.");
      errIds.push('email');
    }

    
  if(!vErrs.isEmpty() || errMsgs.length > 0)
  {
    
    //set error messages to send

    for(err of vErrs.array())
    {
      errMsgs.push(err.msg);
      errIds.push(err.param);
    }

    //return with errors
    return res.render('auth/signup', {
      pageTitle: "Signup For Your Entertainment Library! fail",
      path: '/signup',
      errMsgs: errMsgs,
      errIds: errIds
    });
  }

  //passed, create new users account
  //hash password
  bcrypt.hash(req.body.password, numHashes)
  .then(passHash => {

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: passHash,
      userImage: '/images/default-user-image.png'
    });

    newUser.save()
    .then(result => {
      //send email? NEED FIX
      /*
      transporter.sendMail({
        to: email, 
        from: '',
        subject: 'Welcome to Your Entertainment Library!',
        html: '<p>Welcome to Your Entertainment Library! The one place where you can track all your games, books, and movies!</p>'
      })
      .then(result => {
        console.log("Maile sent: " + result);
      })
      .catch(err => console.log(err)); */

      //send to login
      res.render('auth/login', {
        pageTitle: "Signup For Your Entertainment Library!",
        path: '/login',
        msgs: ["Congratulations! You've successfully signed up! Please login to your new account."]
      });

    })
    .catch(err => {
      throw new Error("Error saving new user: " + err);
    })//END SAVE USER
  
  })
  .catch(err => {
    throw new Error("Error hashing password: " + err);
  })//END HASH PASSWORD

  })
  .catch(err => {
    console.log("Error checking user signmup info: " + err);
  })//END CHECK EMAIL



  // res.render('auth/signup', {
  //   pageTitle: "Signup For Your Entertainment Library!",
  //   path: '/signup'
  // });
};


exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: "Signup For Your Entertainment Library!",
    path: '/signup'
  });
};

