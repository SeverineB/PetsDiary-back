const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const PetSchema = new Schema({
  picture: {
    data: Buffer,
    contentType: String
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
  }
});

PetSchema.method('transform', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = Pet = mongoose.model('pet', PetSchema)