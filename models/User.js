const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    /* lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('L\'email est invalide')
      } 
    }*/
  },
  password: {
    type: String,
    required: true
  },
  username: {
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