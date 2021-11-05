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
  userImage: {
    type: String,
    required: true
  },

  favorites: {
    items: [
      {
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
      }
    ]
  }
});

module.exports = mongoose.model('User', userSchema);