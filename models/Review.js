var mongoose = require('mongoose')

var ReviewSchema = new mongoose.Schema({

  hikeId: { type: String, default: ''},
  reviewerId: { type: String, default: '' },
  name: {type: String, default: ''},
  description: { type: String, default: '' },
  plants: { type: String, default: '' },
  fungi: { type: String, default: '' },
  animals: { type: String, default: '' },
  pictures: { type: Array, default: [] }

})

ReviewSchema.methods.summary = function() {
  var summary = {
    id: this._id.toString(),
    hikeId: this.hikeId,
    reviewerId: this.reviewerId,
    name: this.name,
    description: this.description,
    plants: this.plants,
    fungi: this.fungi,
    animals: this.animals,
    pictures: this.pictures
  }
  return summary
}

module.exports = mongoose.model('ReviewSchema', ReviewSchema)
