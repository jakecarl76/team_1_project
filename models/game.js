const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
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
