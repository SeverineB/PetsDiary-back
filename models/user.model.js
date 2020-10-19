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
    ref: 'pet',
    }
  ],
  token: {
    type: String,
  }
})

module.exports = User = mongoose.model('user', UserSchema)