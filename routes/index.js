var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// -------------------- TESTING -------------------------

/* GET createhike page */
router.get('/createhike', function(req, res, next) {
  res.render('createhike', null);
});

module.exports = router;
