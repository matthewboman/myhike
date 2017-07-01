const Promise = require('bluebird')
const Review = require('../models/Review')

module.exports = {

  create: (params) => {
    return new Promise((resolve, reject) => {
      Review.create(params, (err, review) => {
        if (err) {
          reject(err)
          return
        }
        resolve(review.summary())
      })
    })
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      Review.findByIdAndRemove(id, (err, review) => {
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
      Review.find(params, (err, reviews) => {
        if (err) {
          reject(err)
          return
        }
        if (isRaw) {
          resolve(reviews)
          return
        }
        const summaries = reviews.map(review => review.summary())
        resolve(summaries)
      })
    })
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      Review.findById(id, (err, review) => {
        if (err) {
          reject(err)
          return
        }
        resolve(review.summary())
      })
    })
  },

  searchDifficulty: (term, isRaw) => {
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
        const summaries = reviews.map(review => review.summary())
        resolve(summaries)
      })
    })
  },

  searchFeatures: (term, includeAll, isRaw) => {
    let featureList = term.split(',')
    const all = includeAll ? { '$all': featureList } : { '$in': featureList }
    return new Promise((resolve, reject) => {
      Review.find({features: all}, (err, reviews) => {
        if (err) {
          reject(err)
          return
        }
        if (isRaw) {
          resolve(reviews)
          return
        }
        const summaries = reviews.map(review => review.summary())
        resolve(summaries)
      })
    })
  },

  searchMany: (searchField, searchTerm, isRaw) => {
    let searchObject
    if (searchField == 'plants') {
      searchObject = {'plants': { '$regex' : searchTerm, '$options' : 'i' }}
    } else if (searchField == 'animals') {
      searchObject = {'animals': { '$regex' : searchTerm, '$options' : 'i' }}
    } else if (searchField == 'fungi') {
      searchObject = {'fungi': { '$regex' : searchTerm, '$options' : 'i' }}
    }
    return new Promise((resolve, reject) => {
      Review.find(searchObject, (err, reviews) => {
        if (err) {
          reject(err)
          return
        }
        if (isRaw) {
          resolve(reviews)
          return
        }
        const summaries = reviews.map(review => review.summary())
        resolve(summaries)
      })
    })
  },

  update: (id, params) => {
    return new Promise((resolve, reject) => {
      Review.findByIdAndUpdate(id, params, {new: true}, (err, review) => {
        if (err) {
          reject(err)
          return
        }
        resolve(review.summary())
      })
    })
  },

}
