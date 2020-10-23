const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const AppointmentSchema = new Schema({
  pet_id: {
    type: Schema.Types.ObjectId,
    ref: 'pet'
  },
  date: {
    type: Date,
    required: true
  },
  hour: {
    type: Date,
    required: true
  },
  vet_name: {
    type: String,
    required: true
  },
  vet_address: {
    type: String,
    required: true
  },
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema)