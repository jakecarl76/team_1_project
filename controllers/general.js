//import modules
//...

//import models
//...


//get index
exports.getIndex = (req, res, next) => {
  res.render('general/index', {
    pageTitle: "Welcome to the Entertainment Library!",
    path: '/'
  });
};

