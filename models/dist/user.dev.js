"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
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
  bookLib: {
    favorites: [],
    lib: []
  },
  gameLib: {
    favorites: [],
    lib: []
  },
  movieLib: {
    favorites: [],
    lib: []
  }
});
module.exports = mongoose.model('User', userSchema);