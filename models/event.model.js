const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const EventSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    startDate: {
        type: Date,
        required: true},
    endDate: {
        type: Date,
        required: true},
    name: {
        type: String,
        required: true},
    address: {
        type: String}
});

module.exports = Event = mongoose.model('events', EventSchema, 'events')