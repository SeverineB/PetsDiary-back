const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const PetSchema = new Schema({
  picture: {
    data: Buffer,
    contentType: String
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
  },
});

module.exports = Pet = mongoose.model('pet', PetSchema)