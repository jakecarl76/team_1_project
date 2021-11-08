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



router.post('/check-user-name', authCtrl.postCheckUsername);

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