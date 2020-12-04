const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const VaccineSchema = new Schema({
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pets'
    },
    vaccineDate: Date,
    vaccineName: String
});

module.exports = Vaccine = mongoose.model('vaccine', VaccineSchema, 'vaccine')