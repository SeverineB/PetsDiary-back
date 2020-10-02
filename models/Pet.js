const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const PetSchema = new Schema({
  picture: {
    data: Buffer,
    contentType: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
  },
  /* general: {
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
    tatto: {
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
  } */
});

/*
TO TRANSFORM _ID IN ID
PetSchema.method('transform', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});
*/

module.exports = Pet = mongoose.model('pet', PetSchema)