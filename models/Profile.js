const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const ProfileSchema = new mongoose.Schema({

  username: { type: String, trim: true, required: true, unique: true, default: ''},
  email: { type: String, trim: true, required: true, unique: true, lowercase: true, default: '' },
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  bio: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: ''},
  image: { type: String, default: ''},
  password: { type: String, required: true, default: '' },
  timestamp: { type: Date, default: Date.now }

})

ProfileSchema.plugin(uniqueValidator)

ProfileSchema.methods.summary = function() {
  const summary = {
    id: this._id.toString(),
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    bio: this.bio,
    city: this.city,
    image: this.image,
    email: this.email,
    timestamp: this.timestamp
  }
  return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)
