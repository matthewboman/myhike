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

      // If user gives address and not lat/lng
      if (params.useAddress == true) {
        // Prep shit for query
        var address = params.address + ',' + params.city + ',' + params.state
        address = address.replace(/ /g, '+')
        var url = 'https://maps.googleapis.com/maps/api/geocode/json'
        var geoParams = {
          key: process.env.GOOGLE_MAP_API,
          address: address
        }
        // Query Google Maps API to get lat/lng
        utils.Requests.get(url, geoParams, function(err, response) {
          if (err) {
            reject(err)
            return
          }
          var results = response.results
          var latLng = results[0].geometry.location
          // Insert lat/lng into Hike data
          params['position'] = latLng

          Hike.create(params, function(err, hike) {
            if (err) {
              reject(err);
              return;
            }
            resolve(hike.summary());
            return
          })
        })
      // If user uses current location or map point
      } else {
        Hike.create(params, function(err, hike) {
          if (err) {
            reject(err);
            return;
          }
          resolve(hike.summary());
          return
        })
      }
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
