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

  controller.find(req.query, function(err, results) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
      return;
    }
    res.json({
      confirmation: 'success',
      results: results
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

  controller.findById(id, function(err, result) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: 'Not found'
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
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

  controller.create(req.body, function(err, result) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: 'post failed'
      })
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
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

  controller.update(id, req.body, function(err, result) {
    if (err) {
      res.json({
        confirmation: 'fail',
        message: 'Update failed'
      })
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
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

  controller.delete(id, function(err, result) {
    if (err) {
      res.json({
        confirmation: 'Fail',
        message: 'Failed to delete'
      })
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  })

})

module.exports = router;
