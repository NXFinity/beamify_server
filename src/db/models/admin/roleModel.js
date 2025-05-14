const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 256
  },
  permissions: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);
