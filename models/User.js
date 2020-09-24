const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pets',
  }],
  token: {
    type: String,
  }
})

module.exports = User = mongoose.model('user', UserSchema)