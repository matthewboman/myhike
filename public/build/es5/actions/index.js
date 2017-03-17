"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var APIManager = require("../utils").APIManager;
module.exports = {

  /* ======================== User data ================================= */

  // Check if user is logged in
  currentUserReceived: function (credentials) {
    return function (dispatch) {
      APIManager.post("/account/login", credentials, function (err, response) {
        if (err) {
          var msg = err.message || err;
          console.error(msg);
          return;
        }
        var user = response.profile;
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: user
        });
      });
    };
  },

  // Get a profile for other users to see
  fetchProfile: function (id) {
    return function (dispatch) {
      var endpoint = "/api/profile/" + id;
      APIManager.get(endpoint, null, function (err, response) {
        if (err) {
          console.error(err);
          return;
        }
        if (response.result.length == 0) {
          console.error("Profile not found");
          return;
        }
        var profile = response.result;
        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: profile
        });
      });
    };
  },

  // Log user out
  logoutUser: function (user) {
    return function (dispatch) {
      APIManager.get("/account/logout", null, function (err, response) {
        if (err) {
          console.error(err.message);
          return;
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: null
        });
      });
    };
  },

  // Create new profile
  profileCreated: function (profile) {
    return function (dispatch) {
      APIManager.post("/account/register", profile, function (err, response) {
        if (err) {
          // let msg = err.message || err
          console.error(err);
          return;
        }
        var user = response.profile;

        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: user
        });
      });
    };
  },

  // Update Profile
  profileUpdated: function (user, profile) {
    return function (dispatch) {
      var endpoint = "/api/profile/" + user.id;
      APIManager.put(endpoint, profile, function (err, response) {
        if (err) {
          console.log(err);
          return;
        }
        var user = response.result;
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: user
        });
      });
    };
  },

  /* ======================== Hike and Map data ============================== */
  currentHikeReceived: function (hike) {
    return {
      type: constants.CURRENT_HIKE_RECEIVED,
      hike: hike };
  },

  // Get hikes to display on map
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

  // Create a new hike
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

  // Select a hike
  hikeSelected: function (id) {
    var hike = id.toString();
    var endpoint = "/api/hike/" + hike;
    return function (dispatch) {
      // GET hike details
      APIManager.get(endpoint, null, function (err, response) {
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

  // Add a hike location by clicking on the map
  locationAdded: function (location) {
    return {
      type: constants.LOCATION_ADDED,
      location: location
    };
  },

  // Get user location (for using current location as hike location)
  userLocationReceived: function (center) {
    return {
      type: constants.USER_LOCATION_RECEIVED,
      center: center
    };
  },

  /* ====================== Review Data ====================================== */

  // Get reviews for a specific hike
  fetchReviews: function (params) {
    return function (dispatch) {
      APIManager.get("/api/review", params, function (err, response) {
        if (err) {
          console.error(err);
          return;
        }
        var reviews = response.results;
        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: reviews
        });
      });
    };
  },

  // Allow user to add new review to a hike
  reviewCreated: function (review, params) {
    return function (dispatch) {
      APIManager.post("/api/review", review, function (err, response) {
        if (err) {
          console.error("Error: " + err.message);
        }
        var reviews = [response.result];

        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: reviews
        });
      });
    };
  },

  // Update a user's review of a hike
  reviewUpdated: function (review) {
    return function (dispatch) {
      var endpoint = "/api/review/" + review.id;
      APIManager.put(endpoint, review, function (err, response) {
        if (err) {
          console.error(err);
          return;
        }
        var updatedReview = response.result;
        dispatch({
          type: constants.REVIEW_UPDATED,
          review: updatedReview
        });
      });
    };
  } };