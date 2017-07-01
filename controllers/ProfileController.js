const bcrypt = require('bcryptjs')
const Promise = require('bluebird')
const Profile = require('../models/Profile')

module.exports = {

	create: (params) => {
		return new Promise((resolve, reject) => {
			params['password'] = bcrypt.hashSync(params.password, 10)
			Profile.create(params, (err, profile) => {
				if (err){
					reject(err)
					return
				}
				resolve(profile.summary())
			})
		})
	},

	delete: (id) => {
		return new Promise((resolve, reject) => {
			Profile.findByIdAndRemove(id, (err, profile) => {
				if (err) {
					reject(err)
					return
				}
				resolve(null)
			})
		})
	},

	find: (params, isRaw) => {
		return new Promise((resolve, reject) => {
			Profile.find(params, (err, profiles) => {
				if (err){
					reject(err)
					return
				}
				if (isRaw){
					resolve(profiles)
					return
				}
				const summaries = profiles.map(profile => profile.summary())
				resolve(summaries)
			})
		})
	},

	findById: (id) => {
		return new Promise((resolve, reject) => {
			Profile.findById(id, (err, profile) => {
				if (err){
					reject(err)
					return
				}
				resolve(profile.summary())
			})
		})
	},

  update: (id, params) => {
    return new Promise((resolve, reject) => {
      Profile.findByIdAndUpdate(id, params, {new: true}, (err, profile) => {
        if (err) {
          reject(err)
          return
        }
        resolve(profile.summary())
      })
    })
  },

}
