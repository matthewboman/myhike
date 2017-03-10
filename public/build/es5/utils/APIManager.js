"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var superagent = _interopRequire(require("superagent"));

module.exports = {

  // GET shit from DB
  get: function (endpoint, params, callback) {
    superagent.get(endpoint).query(params).set("Accept", "application/json").end(function (err, response) {
      if (err) {
        callback(err, null);
        return;
      }

      var confirmation = response.body.confirmation;
      if (confirmation != "success") {
        callback({ message: response.body.message }, null);
        return;
      }

      callback(null, response.body);
    });
  },

  // POST shit to DB
  post: function (endpoint, params, callback) {
    superagent.post(endpoint).send(params).set("Accept", "application/json").end(function (err, response) {
      if (err) {
        callback(err, null);
        return;
      }

      var confirmation = response.body.confirmation;
      if (confirmation != "success") {
        callback({ message: response.body.message }, null);
        return;
      }

      callback(null, response.body);
    });
  },

  // UPDATE shit in the database
  put: function (endpoint, params, callback) {
    superagent.put(endpoint).send(params).set("Accept", "application/json").end(function (err, response) {
      if (err) {
        callback(err, null);
        return;
      }

      var confirmation = response.body.confirmation;
      if (confirmation != "success") {
        callback({ message: response.body.message }, null);
        return;
      }

      callback(null, response.body);
    });
  },

  // DELETE that shit
  "delete": function () {}

};