"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var APIManager = require("../utils").APIManager;
module.exports = {

  // ======================== User data =================================
  currentUserReceived: function (profile) {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      profile: profile
    };
  },

  profileCreated: function (profile) {
    return {
      type: constants.PROFILE_CREATED,
      profile: profile
    };
  },

  // ======================== Hike and Map data ===============================
  currentHikeReceived: function (hike) {
    return {
      type: constants.CURRENT_HIKE_RECEIVED,
      hike: hike };
  },

  fetchHikes: function (params) {
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        reducer: "map",
        status: "loading"
      });

      APIManager.get("/api/hike", params, function (err, response) {
        if (err) {
          console.error(err);
          return;
        }
        var hikes = response.results;

        dispatch({
          type: constants.HIKES_RECEIVED,
          hikes: hikes
        });
      });
    };
  },

  fetchReviews: function (params) {
    return function (dispatch) {
      // console.log('searching for reviews for ' + JSON.stringify(hike))
      APIManager.get("/api/review", params, function (err, response) {
        if (err) {
          console.error(err);
          return;
        }
        var reviews = response.results;
        console.log("actions received reviews " + JSON.stringify(reviews));
        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: reviews
        });
      });
    };
  },

  hikeCreated: function (hike) {
    return function (dispatch) {
      APIManager.post("/api/hike", hike, function (err, response) {
        if (err) {
          console.error("ERROR: " + err.message);
        }
        var newHike = response.result;

        dispatch({
          type: constants.HIKE_ADDED,
          hike: newHike
        });
      });
    };
  },

  hikeSelected: function (id) {
    var hike = id.toString();
    var url = "/api/hike/" + hike;
    return function (dispatch) {
      // GET hike details
      APIManager.get(url, null, function (err, response) {
        if (err) {
          console.error("ERROR: " + err.message);
        }
        var selectedHike = response.result;

        dispatch({
          type: constants.CURRENT_HIKE_RECEIVED,
          currentHike: selectedHike
        });
      });
    };
  },

  locationAdded: function (location) {
    return {
      type: constants.LOCATION_ADDED,
      location: location
    };
  },

  reviewCreated: function (review, hikeId) {
    return function (dispatch) {
      // console.log('action sez review is ' + review)
      APIManager.post("/api/review", review, function (err, response) {
        if (err) {
          console.error("Error: " + err.message);
        }
        var reviews = response.result;

        dispatch({
          type: constants.REVIEWS_RECEIVED,
          hikeId: hikeId,
          reviews: reviews
        });
      });
    };
  },


  userLocationReceived: function (center) {
    return {
      type: constants.USER_LOCATION_RECEIVED,
      center: center
    };
  } };