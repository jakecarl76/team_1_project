//import modules
//...
const fs = require('fs');
const path = require('path');
const cryptoLib = require('crypto');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { validationResult } = require("express-validator");

//import models
//...
const User = require('../models/user');
const { Tokenizer } = require('marked');


const numHashes = 12;


exports.getResetPassword = (req, res, next) => {
  let tmpToken = req.params.token;
  res.render('auth/reset-password', {
    pageTitle: "Reset Your Password!",
    path: '/reset',
    token: tmpToken
  });
};

exports.postResetPassword = (req, res, next) => {
  let tmpToken = req.body.token;
  let email = req.body.email;
  let pwd = req.body.password;
  let cPwd= req.body.cPassword;

  //check for vErrs
  const vErrs = validationResult(req);
  let errMsgs = [];
  let errIds = [];
  let tmpUser = null;

  if(!vErrs.isEmpty() || errMsgs.length > 0)
  {

    //set error messages to send

    for(err of vErrs.array())
    {
      errMsgs.push(err.msg);
      errIds.push(err.param);
    }

    //return with errors
    return res.render('auth/reset-password', {
      pageTitle: "Reset Your Password!",
      path: '/reset',
      token: tmpToken,
      errMsgs: errMsgs,
      errIds: errIds,
      errValues: {
        email: email
      }
    });
  }


  //get user by email
  User.findOne({email: email})
  .then(user => {
    
    if(!user)
    { 
      return res.render('auth/reset-password', {
        pageTitle: "Reset Your Password!",
        path: '/reset',
        token: tmpToken,
        errMsgs: ["Email is invalid. Please enter the email for your account."],
        errIds: ["email"],
        errValues: {
          email: email
        }
      });
    }
    else
    {
      //user found
      //check token is correct for user
      if(user.resetToken != tmpToken)
      {
        //error invalid token
        return res.render('auth/reset-password', {
          pageTitle: "Reset Your Password!",
          path: '/reset',
          token: tmpToken,
          errMsgs: ["The token is invalid for this email. Please use the email for your account."],
          errIds: ["email"],
          errValues: {
            email: email
          }
        });
      }
      else if(Number(user.resetTokenExpiration) < Number(Date.now()))
      {
        //error token expired
        return res.render('auth/login', {
          pageTitle: "Reset Your Password!",
          path: '/reset',
          token: tmpToken,
          errMsgs: ["The reset time for this email has expired."],
          errIds: []
        });
      }
      else
      {
        //success, token matches account with matching email, and not expired
        //reset password
        tmpUser = user;//save user for further promises
        bcrypt.hash(pwd, numHashes)
        .then(newHash => {
          //set new password
          tmpUser.password = newHash;
          //invalidate token
          tmpUser.resetToken = "";
          tmpUser.resetTokenExpiration = null;
          tmpUser.save()
          .then(result => {
            return res.render('auth/login', {
              pageTitle: "Reset Your Password!",
              path: '/reset',
              token: tmpToken,
              msgs: ["Password has been reset! Please login with your new password."]
            });
          })
          .catch(err => {
            throw new Error("Error saving new password: " + err);
          });
        })
        .catch(err => {
          throw new Error("Error hashing password: " + err);
        });

      }
    }//END ELSE USER FOUND
  })
  .catch(err => {
    console.log("Error checking user email: " + err);
    next(err);
  })

};

exports.getCreatePasswordReset = (req, res, next) => {

  res.render('auth/create-password-reset', {
    pageTitle: "Reset Your Password",
    path: "/reset"
  });
};

exports.postCreatePasswordReset = (req, res, next) => {
  let email = req.body.email;
  let tmpToken = "";

  //make sure user exists
  User.findOne({email: email})
  .then(user =>
    {
      if(!user)
      {
        throw new Error("Invalid email entered for password reset! Possible abuse!");
      }
      else
      {
        //valid email, generate password reset token, send email
        cryptoLib.randomBytes(32, (err, buffer) => {
          if(err)
          {
            throw new Error("Error generating reset token: " + err);
          }
          
          const resetToken = buffer.toString('hex');
          //set reset token:
          user.resetToken = resetToken;
          user.resetTokenExpiration = Date.now() + 3600000;//exp in one hour from now

          //save to use later in other arrow funcs
          tmpToken = resetToken;

          //save
          user.save()
          .then(result => {
            console.log("Reset token set: /reset-password/" + tmpToken);


/*NEED TO FIX -- finish this after setup sendmail/etc
            let host = "localhost:3000";
            transporter.sendMail({
              to: req.body.email, 
              from: 'car08056@byui.edu',
              subject: 'Product Store Password Reset',
              html: `<h1> Your Account Has Requested A Password Reset </h1>
                <p>
                  Click link to reset your password.
                </p>
                <a href="http://${host}/password-reset/${reset_token}">Reset Password</a>`
            })
            .then(result => {
              req.flash('msg', 'Email has been sent. Please check your email associated with this account to reset your password.')
              resp.redirect('/');
            })
            .catch(err => console.log(err));//end send email

*/

            
          })
          .catch(err => {
            throw new Error("Error saving user's password reset tokens: " + err);
          })

        });
      }
    })
  .catch(err => {
    console.log(err);
  })
  
  res.redirect('/');

};//END GENERATE PASSWORD RESET TOKEN








exports.postChangeUserImage = (req, res, next) => {
  console.log("image Change Thing");
  console.log(req.files);

  let userId = req.body.userId;
  let newImgPath = req.files[0].filename;
  let oldImgPath = "";
  let tmpUser = null;

  User.findById(userId)
  .then( user => {

    if(!user)
    {
      throw new Error("Could not find user!");
    }
    else
    {
      //username available, change username
      //verify user id
      if(user && user._id.toString() === req.session.user._id.toString())
      {
        console.log("NEW IMG PATH: " + newImgPath);

        tmpUser = user;

        //save old img path
        oldImgPath = user.userImage;

        req.session.user = user;

        //save new user img
        user.userImage = "/images/" + newImgPath;

        console.log("USER: " + req.session.user)

        user.save()
        .then(result => {


          if(oldImgPath == '/images/default-user-image.png')
          {
            console.log("USER IMG DEFAULT -- DON'T DELETE!!")

            //just return response
            return res.status(201).json({msg: "Profile Image Successfully Updated",
                                  newImgURL: user.userImage});
          }
          else
          {
            //delete old user image (don't want to clutter up images dir with unused/lost imgs)
            //extract image's filename
            let tmpImgName = oldImgPath.replace(/^\/images\//, '');
            //create path to image for fs.unlink to use (absolut path on server)
            let tmpPath = path.join (path.dirname(require.main.filename), "public", "images", tmpImgName);

            console.log("delPath = " + tmpPath );

            fs.unlink(tmpPath, () => {
              console.log("DELETED");

            //just return response
            return res.status(201).json({msg: "Profile Image Successfully Updated",
                                  newImgURL: user.userImage});

            });//END UNLINK FUNC

          }//END ELSE DELETE USER IMG
        })
        .catch(err => {
          throw new Error("Error saving new user image url: " + err);
        });

      }//END IF USER ID MATCHES CURR SESS USER ID
      else
      {
        throw new Error("Authentication error! User id does not match current session's user id!");
      }
    }//END USER FOUND

  })
  .catch(err => {
    console.log(err);
    res.json({errMsg: "Server Error"});
  });


};//END CHANGE USER IMG

exports.postChangePassword = (req, res, next) => {
  //get email and user id
  console.log("PASSWORD CHANGE");
  let oldPwd = req.body.oldPwd;
  let newPwd = req.body.newPwd;
  let cNewPwd = req.body.cNewPwd;
  let userId = req.body.userId;
  let tmpUser = null;

  //check for validation errors
  let vErrs = validationResult(req);
  
  if(!vErrs.isEmpty())
  {
    
    let tmpArr = vErrs.array();
    let errMsg = [];
    let errIds = [];

    for(err of tmpArr)
    {
      errMsg.push(err.msg);
      errIds.push(err.param);

    }
    console.log(errMsg);
    return res.json({errMsg: errMsg,
                     errIds: errIds})
  }//END IF VERRS

  User.findById(userId)
  .then( user => {

    if(!user)
    {
      throw new Error("Could not find user!");
    }
    else
    {
      //save ref for later use
      tmpUser = user;
      //username available, change username
      //verify user id
      if(user && user._id.toString() === req.session.user._id.toString())
      {

        //check old password
        bcrypt.compare(oldPwd, user.password)
        .then(hashRes => {
          if(hashRes)
          {console.log("correct pwd");
            //correct password
            //hash new password
            bcrypt.hash( newPwd, numHashes)
            .then(newHash => { 

              //set new password and save
              user.password = newHash;
              req.session.user = user;
              //save changes
              user.save()
              .then(result => {
                res.status(201).json({msg: "Password successfully changed." });
              })
              .catch(err => {
                throw new Error("Error saving changes to Password: " + err);
              });//END USER SAVE


            })
            .catch(err => {
              throw new Error("Error hashing new password: " + err);
            });

          }
          else
          { console.log("bad Pwd");
            //incorrect password
            return res.json({errMsg: ["Password incorrect."],
              errIds: ["oldPwd"]});
          }
        })
        .catch(err => {
          throw new Error("Error Hashing Old Password.")
        });
      }
      else
      {
        //send fail message
        res.json({errMsg: "Sorry, something went wrong. Please try again."})
      }
    }//END ELSE USER FOUND

  })
  .catch(err => {
    console.log(err);
    res.json({errMsg: "Server Error"});
  });
};//END POST CHANGE PASSWORD


exports.postCheckEmail = (req, res, next) => {
  //get email
  console.log("EMAIL CHECK");
  let email = req.body.email;

  //check for validation errors
  let vErrs = validationResult(req);
  console.log(email);
  if(!vErrs.isEmpty())
  {console.log("verrs");
    return res.json({errMsg: vErrs.array()[0].msg})
  }

  User.find({email: email})
  .then( users => {

    if(users.length > 0)
    {
      res.json({errMsg: "That email is aready associated with another account."})
    }
    else
    {
      res.json({msg: "That email is available."});
    }

  })
  .catch(err => {
    console.log(err);
    res.json("Error");
  });
};//END POST CHECK USER EMAIL

exports.postChangeEmail = (req, res, next) => {
  //get email and user id
  console.log("EMAIL CHANGE");
  let email = req.body.email;
  let userId = req.body.userId;

  //check for validation errors
  let vErrs = validationResult(req);
  console.log(email);
  if(!vErrs.isEmpty())
  {console.log("verrs");
    return res.json({errMsg: vErrs.array()[0].msg})
  }


  User.find({email: email})
  .then( users => {

    if(users.length > 0)
    {
      res.json({errMsg: "Sorry, that email is already associated with another account. Please choose another and try again."})
    }
    else
    {
      //username available, change username
      User.findById(userId)
      .then(user => {
        //check user id
        if(user && user._id.toString() === req.session.user._id.toString())
        {
          //update session
          req.session.user = user;
          user.email = email;
          //save changes
          user.save()
          .then(result => {
            res.status(201).json({msg: "Email successfully Changed to " + email,
                                  newEmail: email});
          })
          .catch(err => {
            throw new Error("Error saving changes to email: " + err);
          });
        }
        else
        {
          //send fail message
          res.json({errMsg: "Sorry, something went wrong. Please try again."})
        }
      })
    }

  })
  .catch(err => {
    console.log(err);
    res.json({errMsg: "Server Error"});
  });
};//END POST CHECK USER EMAIL

exports.postCheckUsername = (req, res, next) => {
  //get user name
  console.log("UNAME CHECK");
  let username = req.body.username.toLowerCase().replace(/ /g, "");

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
};//END POST CHECK USER NAME

exports.postChangeUsername = (req, res, next) => {
  //get user name
  console.log("UNAME CHANGE");
  let username = req.body.username.toLowerCase().replace(/ /g, "");
  let userId = req.body.userId;

  User.find({username: username})
  .then( users => {

    if(users.length > 0)
    {
      res.json({errMsg: "Sorry, that username is already taken. Please choose another and try again."})
    }
    else
    {
      //username available, change username
      User.findById(userId)
      .then(user => {
        //check user id
        if(user && user._id.toString() === req.session.user._id.toString())
        {
          //update session
          req.session.user = user;
          user.username = username;
          //save changes
          user.save()
          .then(result => {
            res.status(201).json({msg: "Name successfully Changed to " + username,
                                  newUsername: username});
          })
          .catch(err => {
            throw new Error("Error saving changes to username.");
          });
        }
        else
        {
          //send fail message
          res.json({errMsg: "Sorry, something went wrong. Please try again."})
        }
      })
    }

  })
  .catch(err => {
    console.log(err);
    res.json({errMsg: "Server Error"});
  });
};//END POST CHANGE USER NAME

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
      //if correct password
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

