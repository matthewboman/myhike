var Hike = require('../models/Hike');

module.exports = {

  // GET
  find: function(params, callback) {
    Hike.find(params, function(err, hikes) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, hikes);
    })
  },

  findById: function(id, callback) {
    Hike.findById(id, function(err, hike) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, hike)
    })
  },

  // POST
  create: function(params, callback) {
    Hike.create(params, function(err, hike) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, hike);
    })
  },

  // PUT
  update: function(id, params, callback) {
    Hike.findByIdAndUpdate(id, params, {new: true}, function(err, hike) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, hike);
    })
  },

  // DELETE
  delete: function(id, callback) {
    Hike.findByIdAndRemove(id, function(err, zone) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, null)
    })
  },

}
