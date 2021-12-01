const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewText: {
        type: String,
        required: true
   },
   contentId: {
      type: Schema.Types.ObjectId,
      ref: 'Book' || 'Game' || 'Movie',
      required: true
   },
   date: {
      type: Date,
      required: true
   },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
   },
   username: {
      type: String,
      required: true
   }
});

module.exports = mongoose.model('Review', reviewSchema);
