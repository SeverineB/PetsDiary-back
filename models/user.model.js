const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  pets: [
    {
    type: Schema.Types.ObjectId,
    ref: 'pets',
    }
  ],
  events: [
    {
    type: Schema.Types.ObjectId,
    ref: 'events',
    }
  ],
  token: {
    type: String,
  }
})

module.exports = User = mongoose.model('users', UserSchema, 'users')