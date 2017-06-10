var Promise = require('bluebird')

var Review = require('../models/Review')

module.exports = {
  // GET
  find: function(params, isRaw) {
    return new Promise(function(resolve, reject) {
      Review.find(params, function(err, reviews) {
        if (err) {
          reject(err)
          return
        }

        if (isRaw) {
          resolve(reviews)
          return
        }

        var summaries = []
        reviews.forEach(function(review) {
          summaries.push(review.summary())
        })
        resolve(summaries)
      })
    })
  },

  findById: function(id) {
    return new Promise(function(resolve, reject) {
      Review.findById(id, function(err, review) {
        if (err) {
          reject(err)
          return
        }

        resolve(review.summary())
      })
    })
  },

  // POST
  create: function(params) {
    return new Promise(function(resolve, reject) {
      Review.create(params, function(err, review) {
        if (err) {
          reject(err)
          console.log(err)
          return
        }
        resolve(review.summary())
      })
    })
  },

  // PUT
  update: function(id, params) {
    return new Promise(function(resolve, reject) {
      Review.findByIdAndUpdate(id, params, {new: true}, function(err, review) {
        if (err) {
          reject(err)
          return
        }
        resolve(review.summary())
      })
    })
  },

  // DELETE
  delete: function(id) {
    return new Promise(function(resolve, reject) {
      Review.findByIdAndRemove(id, function(err, review) {
        if (err) {
          reject(err)
          return
        }
        resolve(null)
      })
    })
  }

}
