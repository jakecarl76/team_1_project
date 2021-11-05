const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    requrired: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordToken: String,
  passwordTokenExp: Date,
  userImage: {
    type: String,
    required: true
  },
  bookLib: {favorites: [], lib: []},
  gameLib: {favorites: [], lib: []},
  movieLib: {favorites: [], lib: []}
});

//function example
//userSchema.methods.function = function(params) {};

module.exports = mongoose.model('User', userSchema);