//import modules
const express = require('express');
const {body} = require('express-validator/check');

//import custom controllers
const authCtrl = require('../controllers/auth');
//...




//create router
const router = express.Router();

//routes
//...


router.get('/reset-password/:token', authCtrl.getResetPassword);

router.post('/reset-password', 
            body('email')
              .notEmpty()
              .withMessage("You must enter your email.")
              .isEmail()
              .withMessage("Email is invalid. Please enter the email for your account.")
              .normalizeEmail(), 
            body('password')
              .notEmpty()
              .withMessage("You must enter a valid password")
              .isLength({min: 9})
              .withMessage("Password is too short. Your password must be at least 9 characters long.")
              .custom( (value, {req}) => {
                if(value.toLowerCase() === 'password' || value === '123456789')
                {
                  return false
                }

                return true;
              })
              .withMessage("That password is insecure. Please try another one.")
              .custom( (value, {req}) => {
                if(req.body.cPassword !== value)
                {
                  return false;
                }
                return true
              })
              .withMessage("The Confirm Password does not match the Password."),
              authCtrl.postResetPassword);



router.get('/create-password-reset', authCtrl.getCreatePasswordReset);

router.post('/create-password-reset',authCtrl.postCreatePasswordReset);

router.post('/change-user-image', authCtrl.postChangeUserImage);

router.post('/change-password',
            body('oldPwd', 'You must enter your old password in order to change it.')
            .notEmpty(),
            body('newPwd')
            .notEmpty()
            .withMessage("You must enter a new password.")
            .isLength({min: 9})
            .withMessage("Password is too short. Your password must be at least 9 characters long.")
            .custom( (value, {req}) => {
              if(value.toLowerCase() === 'password' || value === '123456789')
              {
                return false
              }

              return true;
            })
            .withMessage("That password is insecure. Please try another one.")
            .custom( (value, {req}) => {
              if(value == req.body.oldPwd)
              {
                return false
              }

              return true;
            })
            .withMessage("New password is the same as the old password.")
            .custom( (value, {req}) => {
              if(req.body.cNewPwd !== value)
              {
                return false;
              }
              return true
            })
            .withMessage("The Confirm Password does not match the New Password."),
            authCtrl.postChangePassword);

router.post('/check-user-name', authCtrl.postCheckUsername);

router.post('/change-user-name', authCtrl.postChangeUsername);

router.post('/check-email',
            body('email', "Email is invalid. You must enter a valid email.")
            .notEmpty()
            .isEmail()
            .normalizeEmail(),
            authCtrl.postCheckEmail);

router.post('/change-email',
            body('email', "Email is invalid. You must enter a valid email.")
            .notEmpty()
            .isEmail()
            .normalizeEmail(),
            authCtrl.postChangeEmail);

router.post('/logout', authCtrl.postLogout);

router.get('/user-profile', authCtrl.getProfile);

router.get('/login', authCtrl.getLogin);

router.post('/login', 
            body('email')
            .notEmpty()
            .withMessage("You must enter the email for your account to login.")
            .isEmail()
            .withMessage("Email is invalid. You must enter the email for your account to login.")
            .normalizeEmail(),
            body('password')
            .notEmpty()
            .withMessage("You must enter the password for your account to login."),
            authCtrl.postLogin)

router.get('/signup', authCtrl.getSignup);

router.post('/signup', 
            body('email')
              .notEmpty()
              .withMessage("You must enter your email.")
              .isEmail()
              .withMessage("Email is invalid. Please enter a valid email.")
              .normalizeEmail(), 
            body('username')
              .notEmpty()
              .withMessage("You must enter a username.")
              .custom( (value, {req}) => {
                if(value.toLowerCase() === 'admin')
                {
                  throw new Error("You cannot use " + value + " as a user name.");
                }
                //otherwise pass
                return true;
              }),
            body('password')
              .notEmpty()
              .withMessage("You must enter a valid password")
              .isLength({min: 9})
              .withMessage("Password is too short. Your password must be at least 9 characters long.")
              .custom( (value, {req}) => {
                if(value.toLowerCase() === 'password' || value === '123456789')
                {
                  return false
                }

                return true;
              })
              .withMessage("That password is insecure. Please try another one.")
              .custom( (value, {req}) => {
                if(req.body.cPassword !== value)
                {
                  return false;
                }
                return true
              })
              .withMessage("The Confirm Password does not match the Password."),
            authCtrl.postSignup);


//
//router.get( '', authCtrl.getIndex);

//export router
module.exports = router;