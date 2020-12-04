const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const DewormingSchema = new Schema({
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pets'
    },
    dewormingDate: Date,
    dewormingName: String
});

module.exports = Deworming = mongoose.model('deworming', DewormingSchema, 'deworming')