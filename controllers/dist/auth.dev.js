"use strict";

//import modules
//...
var bcrypt = require('bcryptjs');

var _require = require('express'),
    response = _require.response;

var _require2 = require("express-validator"),
    validationResult = _require2.validationResult; //import models
//...


var User = require('../models/user');

var numHashes = 12;

exports.postCheckUsername = function (req, res, next) {
  //get user name
  console.log("UNAME CHECK");
  var username = req.body.username.toLowerCase().replace(/ /g, "");
  console.log(username);
  User.find({
    username: username
  }).then(function (users) {
    if (users.length > 0) {
      res.json("fail");
    } else {
      res.json("free");
    }
  })["catch"](function (err) {
    console.log(err);
    res.json("Error");
  });
};

exports.postLogout = function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.log("Error loging out: " + err);
    }

    res.redirect('/login');
  });
};

exports.getProfile = function (req, res, next) {
  res.render('auth/user-profile', {
    pageTitle: "Your Entertainment Library Account",
    path: "/user-profile",
    userObj: req.session.user //NEED FIX -- this should be attached in app.js to res.locals

  });
};

exports.getLogin = function (req, res, next) {
  res.render('auth/login', {
    pageTitle: "Entertainment Library Login",
    path: "/login"
  });
};

exports.postLogin = function (req, res, next) {
  //check for validation errors
  var vErrs = validationResult(req);
  var errMsgs = [];
  var errIds = [];
  var email = req.body.email;
  var password = req.body.password;

  if (!vErrs.isEmpty()) {
    //set error messages to send
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = vErrs.array()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        err = _step.value;
        errMsgs.push(err.msg);
        errIds.push(err.param);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    tmpEmail = ""; //fix normalized blank for email

    if (req.body.email !== '@') {
      tmpEmail = req.body.email;
    } //return with errors


    return res.render('auth/login', {
      pageTitle: "Entertainment Library Login",
      path: '/login',
      errMsgs: errMsgs,
      errIds: errIds,
      errValues: {
        email: tmpEmail
      }
    });
  } //END IF VALIDATION ERRORS
  //check user exists with given email


  var tmpUser = null;
  User.findOne({
    email: email
  }).then(function (user) {
    if (!user) {
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
    } //END IF NO USER
    //set user so can access in future


    tmpUser = user; //check password is correct

    bcrypt.compare(password, user.password).then(function (hashResult) {
      console.log(hashResult);

      if (hashResult) {
        req.session.user = tmpUser;
        req.session.isLoggedIn = true; //use session save to make sure sess is saved before redirect

        req.session.save(function (err) {
          if (err) {
            throw new Error("Error saving user session: " + err);
          }

          return res.redirect('/user-profile');
        }); //END SESS SAVE
      } //END IF HASH RESULT
      else {
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
    })["catch"](function (err) {
      throw new Error("Error checking password: " + err);
    });
  })["catch"](function (err) {
    console.log("Error searching for user by email: " + err);
    next(err);
  }); //END FIND USER BY EMAIL
}; //END POST LOGIN


exports.postSignup = function (req, res, next) {
  //get validation errors
  var vErrs = validationResult(req);
  var errMsgs = [];
  var errIds = [];
  var email = req.body.email;
  var username = req.body.username;

  if (username !== undefined) {
    username.toLowerCase().replace(/ /g, "");
  } //check user name


  User.find({
    username: username
  }).then(function (users) {
    if (users.length > 0) {
      errMsgs.push("Sorry, that username is already taken by another users.");
      errIds.push('username');
    }

    return User.find({
      email: email
    });
  }).then(function (users) {
    if (users.length > 0) {
      errMsgs.push("Sorry, that email is already used by another account.");
      errIds.push('email');
    }

    if (!vErrs.isEmpty() || errMsgs.length > 0) {
      //set error messages to send
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = vErrs.array()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          err = _step2.value;
          errMsgs.push(err.msg);
          errIds.push(err.param);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      tmpEmail = ""; //fix normalized blank for email

      if (req.body.email !== '@') {
        tmpEmail = req.body.email;
      } //return with errors


      return res.render('auth/signup', {
        pageTitle: "Signup For Your Entertainment Library!",
        path: '/signup',
        errMsgs: errMsgs,
        errIds: errIds,
        errValues: {
          username: username,
          email: tmpEmail
        }
      });
    } //passed, create new users account
    //hash password


    bcrypt.hash(req.body.password, numHashes).then(function (passHash) {
      var newUser = new User({
        username: username,
        email: email,
        password: passHash,
        userImage: '/images/default-user-image.png'
      });
      newUser.save().then(function (result) {
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
      })["catch"](function (err) {
        throw new Error("Error saving new user: " + err);
      }); //END SAVE USER
    })["catch"](function (err) {
      throw new Error("Error hashing password: " + err);
    }); //END HASH PASSWORD
  })["catch"](function (err) {
    console.log("Error checking user signmup info: " + err);
    next(err);
  }); //END CHECK EMAIL
}; //END POST SIGNUP


exports.getSignup = function (req, res, next) {
  res.render('auth/signup', {
    pageTitle: "Signup For Your Entertainment Library!",
    path: '/signup'
  });
};