const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({

  hikeId: { type: String, default: ''},
  hikeName: { type: String, default: ''},
  userId: { type: String, default: ''},
  user: { type: mongoose.Schema.Types.Mixed, default: {} },
  description: { type: String, default: '' },
  difficulty: { type: String, default: '' },
  features: { type: Array, default: [] },
  plants: { type: String, default: '' },
  fungi: { type: String, default: '' },
  animals: { type: String, default: '' },
  pictures: { type: Array, default: [] },
  timestamp: { type: Date, default: Date.now }
})

ReviewSchema.methods.summary = function() {
  const summary = {
    id: this._id.toString(),
    hikeId: this.hikeId,
    hikeName: this.hikeName,
    userId: this.userId,
    user: this.user,
    description: this.description,
    difficulty: this.difficulty,
    features: this.features,
    plants: this.plants,
    fungi: this.fungi,
    animals: this.animals,
    pictures: this.pictures,
    timestamp: this.timestamp,
  }
  return summary
}

module.exports = mongoose.model('ReviewSchema', ReviewSchema)
