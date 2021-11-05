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


/*cannot test until My Items page is created*/
//get Edit Item
exports.getEditItem= (req, res, next) => {
  //Is the user in edit mode? Only allow access if in edit mode.
  const editMode = req.query.edit;

  //if not in edit mode, redirect Home
  if(!editMode){
    return res.redirect('/');
  }

  /*NEED TO ADD ITEM TYPE TO EDIT LINK ON MY ITEMS*/
  

/*NEED TO ADD ITEM ID TO EDIT LINK ON MY ITEMS*/
  //gather item id and type from params
  const itemId = req.params.itemId;
  const itemType = req.params.type;

  //locate product
  switch (itemType){
    case book:
      Book.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:book catch');
        return next(error);
      });
      break;
    case game:
      Game.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:game catch');
        return next(error);
      });
      break;
    case movie:
      Movie.findById(itemId)
      .then(item => {   
        displayEditItem(item, itemType, res, req);
        })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        console.log('getEditItem case:movie catch');
        return next(error);
      });
      break;
    default:
      console.log("getEditItem case: default - Not accepted parameter.")
  }
}
  
/* used in getEditItem*/
function displayEditItem(item, itemType, res, req){
  //if no item, redirect Home
  if (!item) {
    return res.redirect('/');
  }
  //if product found, send to edit product with product info
  res.render('/edit-product', {
    pageTitle: 'Edit Item',
    path: '/edit-item',
    editing: editMode,
    itemType: itemType,
    item: item,
    hasError: false,
    user: req.user.name,
    errorMessage: "",
    validationErrors: []
  })
}