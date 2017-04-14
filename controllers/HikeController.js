var Promise = require('bluebird')

var Hike = require('../models/Hike');
var utils = require('../utils')

module.exports = {

  // GET
  find: function(params, isRaw) {
    return new Promise(function(resolve, reject) {
      Hike.find(params, function(err, hikes) {

        if (err) {
          reject(err)
          return
        }

        if (isRaw) {
          resolve(hikes)
          return
        }

        var summaries = []
        hikes.forEach(function(hike) {
          summaries.push(hike.summary())
        })

        resolve(summaries)
      })
    })
  },

  findById: function(id) {
    return new Promise(function(resolve, reject) {
      // See if hike exists in database
      Hike.findById(id, function(err, hike) {
        if (err) {
          reject(err)
          return
        }

        resolve(hike.summary())
      })
    })
  },

  // POST
  create: function(params) {
    return new Promise(function(resolve, reject) {
      Hike.create(params, function(err, hike) {
        if (err) {
          reject(err);
          return;
        }
        resolve(hike.summary());
        return
      })
    })

  },

  // PUT
  update: function(id, params, callback) {
    return new Promise(function(resolve, reject) {
      Hike.findByIdAndUpdate(id, params, {new: true}, function(err, hike) {
        if (err) {
          reject(err);
          return;
        }
        resolve(hike.summary());
      })
    })
  },

  // DELETE
  delete: function(id, callback) {
    return new Promise(function(resolve, reject) {
      Hike.findByIdAndRemove(id, function(err, hike) {
        if (err) {
          reject(err);
          return;
        }
        resolve(null)
      })
    })
  },

}
