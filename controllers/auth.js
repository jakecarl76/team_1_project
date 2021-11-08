//import modules
//...
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { validationResult } = require("express-validator");

//import models
//...
const User = require('../models/user');


const numHashes = 12;

exports.postCheckUsername = (req, res, next) => {
  //get user name
  console.log("UNAME CHECK");
  let username = req.body.username.toLowerCase().replace(/ /g, "");
  console.log(username);
  

  User.find({username: username})
  .then( users => {

    if(users.length > 0)
    {
      res.json("fail")
    }
    else
    {
      res.json("free");
    }

  })
  .catch(err => {
    console.log(err);
    res.json("Error");
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if(err)
    {
      console.log("Error loging out: " + err);
    }
    res.redirect('/login');
  });
};

exports.getProfile = (req, res, next) => {
  res.render('auth/user-profile', {
    pageTitle: "Your Entertainment Library Account",
    path: "/user-profile",
    userObj: req.session.user //NEED FIX -- this should be attached in app.js to res.locals
  });
};

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: "Entertainment Library Login",
    path: "/login"
  });
};

exports.postLogin = (req, res, next) => {
  //check for validation errors
  let vErrs = validationResult(req);

  let errMsgs = [];
  let errIds = [];

  let email = req.body.email;
  let password = req.body.password;

  if(!vErrs.isEmpty() )
  {

    //set error messages to send

    for(err of vErrs.array())
    {
      errMsgs.push(err.msg);
      errIds.push(err.param);
    }

    tmpEmail = "";
    //fix normalized blank for email
    if(req.body.email !== '@')
    {
      tmpEmail = req.body.email;
    }

    //return with errors
    return res.render('auth/login', {
      pageTitle: "Entertainment Library Login",
      path: '/login',
      errMsgs: errMsgs,
      errIds: errIds,
      errValues: {
        email: tmpEmail
      }
    });
  }//END IF VALIDATION ERRORS

  //check user exists with given email
  let tmpUser = null;
  User.findOne({email:email})
  .then(user => {
    if(!user)
    {
      //failed to login
      return res.render('auth/login', {
        pageTitle: "Entertainment Library Login",
        path: '/login',
        errMsgs: ["Invalid Email or Password. Please try again."],
        errIds: ["email, password"],
        errValues: {
          email: tmpEmail
        }
      });
    }//END IF NO USER

    //set user so can access in future
    tmpUser = user;

    //check password is correct
    bcrypt.compare(password, user.password)
    .then(hashResult => {
      console.log(hashResult);
      if(hashResult)
      {
        req.session.user = tmpUser;
        req.session.isLoggedIn = true;

        //use session save to make sure sess is saved before redirect
        req.session.save(err => {
          if(err)
          {
            throw new Error("Error saving user session: " + err);
          }

          return res.redirect('/user-profile');

        });//END SESS SAVE
      }//END IF HASH RESULT
      else
      {
        //if made it here, wrong password for user
        return res.render('auth/login', {
          pageTitle: "Entertainment Library Login",
          path: '/login',
          errMsgs: ["Invalid Email or Password. Please try again."],
          errIds: ["email, password"],
          errValues: {
          email: email
        }
      });
      }
      

    })
    .catch(err => {
      throw new Error("Error checking password: " + err);
    })

  })
  .catch(err => {
    console.log("Error searching for user by email: " + err);
    next(err);
  });//END FIND USER BY EMAIL
};//END POST LOGIN

exports.postSignup = (req, res, next) => {

  //get validation errors
  const vErrs = validationResult(req);
  let errMsgs = [];
  let errIds = [];

  let email = req.body.email;
  let username = req.body.username;

  if(username !== undefined)
  {
    username.toLowerCase().replace(/ /g, "");
  }

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

    tmpEmail = "";
    //fix normalized blank for email
    if(req.body.email !== '@')
    {
      tmpEmail = req.body.email;
    }

    //return with errors
    return res.render('auth/signup', {
      pageTitle: "Signup For Your Entertainment Library!",
      path: '/signup',
      errMsgs: errMsgs,
      errIds: errIds,
      errValues: {
        username:username,
        email: tmpEmail
      }
    });
  }

  //passed, create new users account
  //hash password
  bcrypt.hash(req.body.password, numHashes)
  .then(passHash => {

    const newUser = new User({
      username: username,
      email: email,
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
    next(err);
  })//END CHECK EMAIL

};//END POST SIGNUP


exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: "Signup For Your Entertainment Library!",
    path: '/signup'
  });
};