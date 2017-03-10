var mongoose = require('mongoose')

var ReviewSchema = new mongoose.Schema({

  hikeId: { type: String, default: ''},
  author: { type: mongoose.Schema.Types.Mixed, default: {} },
  description: { type: String, default: '' },
  plants: { type: String, default: '' },
  fungi: { type: String, default: '' },
  animals: { type: String, default: '' },
  pictures: { type: Array, default: [] },
  timestamp: { type: Date, default: Date.now }
})

ReviewSchema.methods.summary = function() {
  var summary = {
    id: this._id.toString(),
    hikeId: this.hikeId,
    author: this.author,
    description: this.description,
    plants: this.plants,
    fungi: this.fungi,
    animals: this.animals,
    pictures: this.pictures,
    timestamp: this.timestamp,
  }
  return summary
}

module.exports = mongoose.model('ReviewSchema', ReviewSchema)
