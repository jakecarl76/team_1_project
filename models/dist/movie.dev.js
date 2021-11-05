"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
module.exports = mongoose.model('Movie', movieSchema);