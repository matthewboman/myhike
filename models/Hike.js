var mongoose = require('mongoose')

var HikeSchema = new mongoose.Schema({

  name: { type: String, default: '' },
  user: { type: String, default: '' },
  position: { type: Object, default: {} },
  useAddress: { type: Boolean, default: false },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  country: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }

})

HikeSchema.methods.summary = function() {
  var summary = {
    // id: this._id.toString(),
    id: this._id,
    name: this.name,
    user: this.user,
    position: this.position,
    useAddress: this.useAddress,
    address: this.address,
    city: this.city,
    state: this.state,
    country: this.country,
    timestamp: this.timestamp
  }
  return summary
}

module.exports = mongoose.model('HikeSchema', HikeSchema);
