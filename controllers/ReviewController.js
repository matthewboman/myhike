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

  searchDifficulty: function(term, isRaw) {
    const t = term.toString()
    return new Promise((resolve, reject) => {
      Review.find({difficulty: t}, (err, reviews) => {
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

  searchFeatures: function(term, includeAll, isRaw) {
    let featureList = term.split(',')
    if (includeAll) {
      return new Promise((resolve, reject) => {
        Review.find({features: { $all: featureList }}, (err, reviews) => {
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
    } else {
      return new Promise((resolve, reject) => {
        Review.find({features: { $in: featureList }}, (err, reviews) => {
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
    }
  },

  searchMany: function(searchField, searchTerm, isRaw) {
    if (searchField == 'plants') {
      return new Promise((resolve, reject) => {
        Review.find({'plants': { '$regex' : searchTerm, '$options' : 'i' }}, (err, reviews) => {
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
    } else if (searchField == 'animals') {
      return new Promise((resolve, reject) => {
        Review.find({'animals': { '$regex' : searchTerm, '$options' : 'i' }}, (err, reviews) => {
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
    } else if (searchField == 'fungi') {
      return new Promise((resolve, reject) => {
        Review.find({'fungi': { '$regex' : searchTerm, '$options' : 'i' }}, (err, reviews) => {
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
    }
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
