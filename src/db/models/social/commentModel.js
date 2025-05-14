const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 1024
  },
  likes: {
    type: Number,
    default: 0
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
