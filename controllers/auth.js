//import modules
//...
const fs = require('fs');
const path = require('path');
const cryptoLib = require('crypto');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { validationResult } = require("express-validator");
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');

//setup sendgrid or set to error
sendgrid_api_key = process.env.SENDGRID_API_KEY || "ERROR";
const SITE_HOST = process.env.SITE_HOST || "localhost:3005";

let transporter = null;

//check that key was imported correctly
if(sendgrid_api_key !== "ERROR")
{
  //setup sendgrid
  transporter = nodemailer.createTransport(sendgrid({
    auth: {
      api_key: sendgrid_api_key
    }
  }));
}
else
{
  console.log("Error: Sendgrid API Key not found!");
}
//import models
//...
const User = require('../models/user');
const { Tokenizer } = require('marked');


const numHashes = 12;

exports.makeUserAdmin = (req, res, next) => {
  let targUID = req.body.targetUserId;
  let authUID = req.body.currUserId;
  let newStatus = req.body.newStatus;
console.log(authUID + " : " + targUID);
  let tmpUser = null;
  let tmpAdmin = null;

  //verify admin status
  User.findById(authUID)
  .then(user => {
    if(user)
    { tmpAdmin = user;
      console.log(user);

      if(user.adminStatus === 'isAdmin' && req.user._id.toString() === user._id.toString())
      {
        User.findById(targUID)
        .then(user => {
          //check user found
          if(user)
          { tmpUser = user;
            user.adminStatus = newStatus;
            user.save()
            .then(result => {
              res.status(200).json({
                uid: targUID, 
                msg: tmpUser.username + "admin status updated", 
                newStatus: newStatus})
            })
            .catch(err => {
              throw new Error("Error saving user status: " + err);
            })
          }
          else
          {
            return res.status(404).json({errMsgs: ["Could not find selected user."]})
          }
        })
        .catch(err => {
          throw new Error("error finding target user for admin status change: " + err);
        });
      }
      else
      {
        return res.status(401).json({errMsgs: ["You are not authorized to do that."]});
      }

      user.adminStatus = "isAdmin";
      return user.save();
    }
    else
    {console.log("lost");
      res.write("lost");
      return res.send();
    }
  })
  .catch(err => next(err));
};

exports.getAdminPanel = (req, res, next) => {
  //check that is authed to get
  console.log(req.user);
  if(req.user.adminStatus === "isAdmin")
  {
    //get list of users
    User.find()
    .then(users => {
      res.render('auth/admin', {
        pageTitle: "Your Entertainment Library Account",
        path: "/user-profile",
        userObj: req.user,
        userList: users
      });
    })
    .catch(err => next(err));
  }
  else
  {
    res.status(401).render('auth/user-profile', {
      pageTitle: "Your Entertainment Library Account",
      path: "/user-profile",
      userObj: req.user,
      errMsgs: ["You are not authorized to access that."]
    });
  }
};

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
    return res.status(422).json({
      errMsgs: errMsgs,
      errIds: errIds
    });
  }//END CHECK FOR VERRS


  //get user by email
  User.findOne({email: email})
  .then(user => {
    
    if(!user)
    { 
      return res.status(422).json({
        errMsgs: ["Email is invalid. Please enter the email for your account."],
        errIds: ["email"]
      });
    }
    else
    {
      //user found
      //check token is correct for user
      if(user.resetToken != tmpToken)
      {
        console.log(user.resetToken);
        console.log(tmpToken);
        //error invalid token
        return res.status(422).json({
          errMsgs: ["The token is invalid for this email. Please use the email for your account."],
          errIds: ["email"]
        });
      }
      else if(Number(user.resetTokenExpiration) < Number(Date.now()))
      {
        //error token expired
        return res.status(401).json({
          errMsgs: ["The reset time for this email has expired. You can create a new reset from the <a href='/login'>login</a> page."],
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
            return res.status(200).json({
              msgs: ["Password has been reset! Please <a href='/login'>login</a> with your new password."]
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
  let tmpUser = null;

  //make sure user exists
  User.findOne({email: email})
  .then(user =>
    {
      if(!user)
      {
        console.log("Invalid email entered for password reset! Possible abuse!");
        return res.status(422).json({errMsgs: ["Invalid email. Please enter the email for your account."]})
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
          tmpUser = user;

          //save to use later in other arrow funcs
          tmpToken = resetToken;

          //save
          user.save()
          .then(result => {
            console.log("Reset token set: /reset-password/" + tmpToken);


            if (sendgrid_api_key !== "ERROR")
            {
              transporter.sendMail({
                to: tmpUser.email, 
                from: 'cse341Team1@gmail.com',
                subject: 'Hermit Habitat: Password Reset',
                html: `<p> Your Account Has Requested A Password Reset </p>
                  <p>
                    Click link to reset your password.
                  </p>
                  <a href="${SITE_HOST}/reset-password/${tmpToken}">Reset Password</a>`
              })
              .then(result => {
                console.log("Email Sent: " + result);
              })
              .catch(err => console.log(err));//end send email;
            }

            //send response to tell user reset created
            res.status(201).json({msgs: ["A reset link has been sent. Please check your email."]});
            
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

};//END GENERATE PASSWORD RESET TOKEN





exports.delAccount = (req, res, next) => {
  //get email and user id
  console.log("DEL ACCOUNT");
  let pwd = req.body.pwd;
  let userId = req.body.userId;
  let email = "";
  let tmpUser = null;
  let errMsg = [];
  let errIds = [];

  //check for validation errors
  let vErrs = false;

  if(pwd == "")
  {
    errMsg.push("You must enter your password in order to delete your profile.");
    errIds.push("pwd");
  }
  
  if(vErrs)
  {
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
      if(user && user._id.toString() === req.user._id.toString() || req.user.adminStatus === "isAdmin")
      {

        //check old password
        bcrypt.compare(pwd, req.user.password)
        .then(hashRes => {
          if(hashRes)
          {console.log("correct pwd");
            //correct password
            console.log("deleting account");

            //set email for sending confirmation email later
            email = tmpUser.email;

            //delete account
            User.deleteOne({_id: userId})
            .then(result => {
              //delete session, only if self delete (ie, not if done by admin user)
              if(req.session.user._id.toString() === userId)
              {
                req.session.destroy(err => {
                  if(err)
                  {
                    console.log("Error loging out: " + err);
                  }
                });
              }

              //send email confirming deletion of account
              if(sendgrid_api_key !== "ERROR")
              {
                transporter.sendMail({
                  to: email,
                  from: 'cse341Team1@gmail.com',
                  subject: 'Hermit Habitat: Account Deleted',
                  html: '<p>Your account at Hermit Hbitat has been deleted. We\'re sorry to see you go!</p> <p> Account Deletions are perminate and cannot be executed without the user\'s password. <br> If you did not delete your account, it means that your password and/or email has been compromised. <br> Please consider changing the password used with your email address immediately! </p>'
                })
                .then(result => {
                  console.log("Mail sent: " + result);
                })
                .catch(err => {
                  console.log("Error sending signup confirmation email: " + err);
                });
              }
              

              //return that deleted successfully
              res.status(201).json({msg: "Account Successfully Deleted.", uid: userId });
            })
            .catch(err => {
              throw new Error("Error Deleteing account: " + err);
            });//END USER SAVE

          }
          else
          { console.log("bad Pwd" + pwd);
            //incorrect password
            return res.json({errMsg: ["Password incorrect."],
              errIds: ["oldPwd"]});
          }
        })
        .catch(err => {
          throw new Error("Error Hashing Password.")
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
};//END DEL ACCOUNT





exports.postChangeUserImage = (req, res, next) => {
  console.log("image Change Thing");
  console.log("req.file :", req.file);

  let userId = req.body.userId;
  let newImgPath = req.file.filename;//s[0].filename;
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

                //send confirmation email
                if(sendgrid_api_key !== "ERROR")
                {
                  transporter.sendMail({
                    to: tmpUser.email,
                    from: 'cse341Team1@gmail.com',
                    subject: 'Hermit Habitat: Account Password Changed',
                    html: '<p>The password for your account at Hermit Habitat has been changed.</p> <p>If this is incorrect, please immediately go to Hermit Habitat and reset your password. </p> <p>You may consider also resetting the password for the email used for your account incase it has been compromised.</p>'
                  })
                  .then(result => {
                    console.log("Mail sent: " + result);
                  })
                  .catch(err => {
                    console.log("Error sending signup confirmation email: " + err);
                  });
                }

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
  let oldEmail = "";
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
          oldEmail = user.email;
          user.email = email;
          //save changes
          user.save()
          .then(result => {
            //Send verification email
            if(sendgrid_api_key !== "ERROR")
            {
              transporter.sendMail({
                to: oldEmail,
                from: 'cse341Team1@gmail.com',
                subject: 'Hermit Habitat:Account Email Changed',
                html: '<p>We are notifying you that your account a Hermit Habitat has changed its email from this one to ' + email + '</p> <p>If this is incorrect, please login immediately (with the new email address), change your password, and then change your email back.</p>'
              })
              .then(result => {
                console.log("Mail sent: " + result);
              })
              .catch(err => {
                console.log("Error sending signup confirmation email: " + err);
              });
            }
            

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
  console.log("username: " ,req.body.username);
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
    userObj: req.user 
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
          email: email
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
      //send email
      if(sendgrid_api_key !== "ERROR")
      {
        transporter.sendMail({
          to: email,
          from: 'cse341Team1@gmail.com',
          subject: 'Welcome to Your Entertainment Library at Hermit Habitat!',
          html: '<p>Welcome' + username + ' to Your Entertainment Library at the Hermit Habitat! The one place where you can track all your games, books, and movies!</p>'
        })
        .then(result => {
          console.log("Mail sent: " + result);
        })
        .catch(err => {
          console.log("Error sending signup confirmation email: " + err);
        });
      }
      

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

