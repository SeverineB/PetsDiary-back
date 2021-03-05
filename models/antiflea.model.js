const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const AntifleaSchema = new Schema({
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pets'
    },
    antifleaDate: {
        type: Date,
        required: true},
    antifleaName: {
        type: String,
        required: true
    }
});

module.exports = Antiflea = mongoose.model('antiflea', AntifleaSchema, 'antiflea')