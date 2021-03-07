const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const DewormingSchema = new Schema({
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pets'
    },
    dewormingDate: {
        type: Date,
        required: true},
    dewormingName: {
        type: String,
        required: true}
});

module.exports = Deworming = mongoose.model('deworming', DewormingSchema, 'deworming')