const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const NoteSchema = new Schema({
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pet'
    },
    birthdate: {
      type: Date,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    tattoo: {
      type: String,
    },
    health: {
      vaccine: [{
        date: {
          type: Date,
        },
        name: {
          type: String,
        }
      }],
      deworming: [{
        date: {
          type: Date,
        },
        name: {
          type: String,
        }
      }],
      antiflea: [{
        date: {
          type: Date,
        },
        name: {
          type: String,
        }
      }]
    }
});

module.exports = Note = mongoose.model('note', NoteSchema)