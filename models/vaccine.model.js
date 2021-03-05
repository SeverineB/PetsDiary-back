const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const VaccineSchema = new Schema({
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pets'
    },
    vaccineDate: {
        type: Date,
        required: true},
    vaccineName: {
        type: String,
        required: true}
});

module.exports = Vaccine = mongoose.model('vaccine', VaccineSchema, 'vaccine')