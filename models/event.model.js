const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const EventSchema = new Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    start: {
        type: Date,
        required: true},
    end: {
        type: Date,
        required: true},
    title: {
        type: String,
        required: true},
    address: {
        type: String},
    pet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pets'
    },
});

module.exports = Event = mongoose.model('events', EventSchema, 'events')