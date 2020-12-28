const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const WeightSchema = new Schema({
    pet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pets'
    },
    weightValue: {
        type: Number,
        required: true
    },
    weightDate: {
        type: Date,
        required: true}
});

module.exports = Weight = mongoose.model('weight', WeightSchema, 'weight')