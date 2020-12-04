const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const PetDetailsSchema = new Schema({
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pets'
    },
    sex: {
      type: String,
      enum: ['mâle', 'femelle']
    },
    ide: {
      type: Number,
      min: [100000000000000, 'IDE doit être composé de 15 chiffres'],
      max: [999999999999999, 'IDE doit être composé de 15 chiffres']
    },
    weight: [
      {
      weightValue: Number,
      weightDate: Date
      }
    ],
    vaccine: [
      {
      vaccineDate: Date,
      vaccineName: String
      }
    ],
    deworming: [
      {
        dewormingDate: Date,
        dewormingName: String,
      }
    ],
    antiflea:[
      {
        antifleaDate: Date,
        antifleaName: String,
      }
    ],
});

module.exports = PetDetails = mongoose.model('petdetails', PetDetailsSchema, 'petdetails')