const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

// GET all instances of a resource
router.get('/:resource', (req, res, next) => {
  const resource = req.params.resource
  const controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: `Invalid resource request: ${resource}`
    })
    return
  }

  controller.find(req.query, false)
    .then((entities) => {
      res.json({
        confirmation: 'success',
        results: entities
      })
    })
    .catch((err) => {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})

// GET a specific instance of a resource
router.get('/:resource/:id', (req, res, next) => {

  const resource = req.params.resource
  const id = req.params.id
  const controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: `Invalid resource request: ${resource}`
    })
    return
  }

  controller.findById(id)
    .then((result) => {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch((err) => {
      res.json({
        confirmation: 'fail',
        message: `${resource} ${id} not found.`
      })
    })
})

// POST a new instance of a resource
router.post('/:resource', (req, res, next) => {
  const resource = req.params.resource
  const controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: `Invalid resource request: ${resource}`
    })
    return
  }

  controller.create(req.body)
    .then((result) => {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch((err) => {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})


// UPDATE an existing resource
router.put('/:resource/:id', (req, res, next) => {
  const resource = req.params.resource
  const id = req.params.id
  const controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: `Invalid resource request: ${resource}`
    })
    return
  }

  controller.update(id, req.body)
    .then((result) => {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch((err) => {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})


// DELETE an existing resource
router.delete('/:resource/:id', (req, res, next) => {
  const resource = req.params.resource
  const id = req.params.id
  const controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'Fail',
      message: `Invalid resource request: ${resource}`
    })
    return
  }

  controller.delete(id)
    .then((result) => {
      res.json({
        confirmation: 'success'
      })
    })
    .catch((err) => {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})

module.exports = router
