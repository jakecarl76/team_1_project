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
  favorites: {
    items: [{
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: false
      },
      movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: false
      },
      gameId: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: false
      }
    }]
  }
});