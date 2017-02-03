var mongoose = require('mongoose')

var HikeSchema = new mongoose.Schema({

  name: {
    type: String,
    default: ''
  },
  position: {
    type: Object,
    default: {}
  },
  review: {
    user: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    plants: {
      type: String,
      default: ''
    },
    fungi: {
      type: String,
      default: ''
    },
    animals: {
      type: String,
      default: ''
    },
    pictures: {
      type: Array,
      default: []
    }
  }


})

module.exports = mongoose.model('HikeSchema', HikeSchema);
