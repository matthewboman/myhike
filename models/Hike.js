var mongoose = require('mongoose')

/*
  TODO: Rewrite using a linked DB schema. Utimately, the goal is for one user
    to create a hike, and for other users to be able to add their own reviews.
    This will require a lot of reworking on the front-end too in
    (/scr/components/containers/CreateHike and probably other places too)    
*/

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
