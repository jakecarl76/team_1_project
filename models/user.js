const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },  
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,

  bookLib: {favorites: [], lib: []},
  gameLib: {favorites: [], lib: []},
  movieLib: {favorites: [], lib: []}
});

module.exports = mongoose.model('User', userSchema);