//import modules
//...

//import models
//...



exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: "Signup For Your Entertainment Library!",
    path: '/signup'
  });
};

