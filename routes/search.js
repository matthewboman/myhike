var express = require('express')
var router = express.Router()

var controllers = require('../controllers')

router.get('/:field/:term/:includeAll', (req, res, next) => {
  const searchField = req.params.field
  const searchTerm = req.params.term
  const includeAll = req.params.includeAll

  if (searchField == 'difficulty') {
    controllers.review.searchDifficulty(searchTerm, false)
      .then((reviews) => {
        res.json({
          confirmation: 'success',
          results: reviews
        })
      })
      .catch((err) => {
        res.json({
          confirmation: 'fail',
          results: err
        })
      })
  }

  if (searchField == 'features') {
    controllers.review.searchFeatures(searchTerm, includeAll, false)
      .then((reviews) => {
        res.json({
          confirmation: 'success',
          results: reviews
        })
      })
      .catch((err) => {
        res.json({
          confirmation: 'fail',
          results: err
        })
      })
  }

  if (searchField == 'animals' || searchField == 'plants' || searchField == 'fungi') {
    controllers.review.searchMany(searchField, searchTerm, false)
      .then((reviews) => {
        res.json({
          confirmation: 'success',
          results: reviews
        })
      })
      .catch((err) => {
        res.json({
          confirmation: 'fail',
          results: err
        })
      })
  }

})

module.exports = router
