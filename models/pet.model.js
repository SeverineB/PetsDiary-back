const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const PetSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  avatarPath: {
    type: String,
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
  sex: {
    type: String,
    enum: ['mâle', 'femelle']
  },
  birthdate: {
    type: Date,
  },
  ide: {
    type: Number,
    min: [000000000000001, 'IDE doit être composé de 15 chiffres'],
    max: [999999999999999, 'IDE doit être composé de 15 chiffres']
  },
  weight: [
    {
    type: Schema.Types.ObjectId,
    ref: 'weight'
  }
],
  vaccine: [
    {
    type: Schema.Types.ObjectId,
    ref: 'vaccine'
  }
],
  deworming: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'deworming'
  }
],
  antiflea: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'antiflea'
  }
],
});

module.exports = Pet = mongoose.model('pets', PetSchema, 'pets')