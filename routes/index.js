var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Hike' });
});

/* GET other routes (let react-router handle shit) */
router.get('/add-hike', function(req, res, next) {
  res.render('index', { title: 'My Hike' });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'My Hike' });
});

// router.get('/hike/:id', function(req, res, next) {
//   res.render('index', { title: 'My Hike' });
// });


// -------------------- TESTING -------------------------

/* GET createhike page */
// router.get('/createhike', function(req, res, next) {
//   res.render('createhike', null);
// });

module.exports = router;
