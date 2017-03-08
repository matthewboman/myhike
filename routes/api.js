var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

// GET all instances of a resource
router.get('/:resource', function(req, res, next) {

  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource request: ' + resource
    })
    return;
  }

  controller.find(req.query, false)
    .then(function(entities) {
      res.json({
        confirmation: 'success',
        results: entities
      })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})

// GET a specific instance of a resource
router.get('/:resource/:id', function(req, res, next) {

  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource request ' + resource
    })
    return;
  }

  controller.findById(id)
    .then(function(result) {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: resource + ' ' + id + ' ' + ' not found.'
      })
    })
})

// POST a new instance of a resource
router.post('/:resource', function(req, res, next) {

  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource request: ' + resource
    })
    return;
  }

  controller.create(req.body)
    .then(function(result) {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})


// PUT an existing resource
router.put('/:resource/:id', function(req, res, next) {

  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid resource request: ' + resource
    })
    return;
  }

  controller.update(id, req.body)
    .then(function(result) {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})


// DELETE an existing resource
router.delete('/:resource/:id', function(req, res, next) {

  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'Fail',
      message: 'Invalid resource request: ' + resource
    })
    return;
  }

  controller.delete(id)
    .then(function(result) {
      res.json({
        confirmation: 'success'
      })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})

module.exports = router;
