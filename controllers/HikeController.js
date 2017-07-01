const Promise = require('bluebird')
const Hike = require('../models/Hike');
const utils = require('../utils')

module.exports = {

  create: (params) => {
    return new Promise((resolve, reject) => {
      Hike.create(params, (err, hike) => {
        if (err) {
          reject(err)
          return
        }
        resolve(hike.summary())
      })
    })
  },

  delete: (id, callback) => {
    return new Promise((resolve, reject) => {
      Hike.findByIdAndRemove(id, (err, hike) => {
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
      Hike.find(params, (err, hikes) => {
        if (err) {
          reject(err)
          return
        }
        if (isRaw) {
          resolve(hikes)
          return
        }
        const summaries = hikes.map(hike => hike.summary())
        resolve(summaries)
      })
    })
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      Hike.findById(id, (err, hike) => {
        if (err) {
          reject(err)
          return
        }
        resolve(hike.summary())
      })
    })
  },

  update: (id, params, callback) => {
    return new Promise((resolve, reject) => {
      Hike.findByIdAndUpdate(id, params, {new: true}, (err, hike) => {
        if (err) {
          reject(err)
          return
        }
        resolve(hike.summary())
      })
    })
  },

}
