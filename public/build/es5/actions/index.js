"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var APIManager = require("../utils").APIManager;
module.exports = {

  /* ======================== General =================================== */

  displayMessage: function (message) {
    return {
      type: constants.MESSAGE_RECEIVED,
      message: message };
  },

  displayError: function (message) {
    return {
      type: constants.ERROR_RECEIVED,
      message: message
    };
  },

  /* ======================== User data ================================= */

  // Log user in
  currentUserReceived: function (credentials) {
    console.log(JSON.stringify(credentials));
    return function (dispatch) {
      APIManager.post("/account/login", credentials, function (err, response) {
        if (err) {
          var msg = err.message || err;
          dispatch({ type: constants.ERROR_RECEIVED, message: msg });
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
      APIManager.get("/api/profile/" + id, null, function (err, response) {
        if (err) {
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }
        if (response.result.length == 0) {
          dispatch({ type: constants.ERROR_RECEIVED, message: "Profile not found" });
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
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
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
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }

        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.profile
        });
      });
    };
  },

  // Update Profile
  profileUpdated: function (user, profile) {
    return function (dispatch) {
      APIManager.put("/api/profile/" + user.id, profile, function (err, response) {
        if (err) {
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.result
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
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }
        dispatch({
          type: constants.HIKES_RECEIVED,
          hikes: response.results
        });
      });
    };
  },

  // Create a new hike
  hikeCreated: function (hike) {
    return function (dispatch) {
      APIManager.post("/api/hike", hike, function (err, response) {
        if (err) {
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }
        dispatch({
          type: constants.HIKE_ADDED,
          hike: response.result
        });
        dispatch({
          type: constants.MESSAGE_RECEIVED,
          message: "hike successfully added"
        });
      });
    };
  },

  // Select a hike
  hikeSelected: function (id) {
    var hike = id.toString();
    return function (dispatch) {
      // GET hike details
      APIManager.get("/api/hike/" + hike, null, function (err, response) {
        if (err) {
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }
        dispatch({
          type: constants.CURRENT_HIKE_RECEIVED,
          currentHike: response.result
        });
      });
    };
  },

  // Get user location (for using current location as hike location)
  userLocationReceived: function (position) {
    return {
      type: constants.USER_LOCATION_RECEIVED,
      position: position
    };
  },

  // Mark location clicked on map
  markClickedLocation: function (location, usingMap) {
    return {
      type: constants.MARK_CLICKED_LOCATION,
      location: location,
      usingMap: usingMap
    };
  },

  // Mark hike location on map
  markHikeLocation: function (location, usingMap) {
    return {
      type: constants.MARK_HIKE_LOCATION,
      location: location,
      usingMap: usingMap
    };
  },

  /* ====================== Review Data ====================================== */

  // Get reviews for a specific hike
  fetchReviews: function (params) {
    return function (dispatch) {
      APIManager.get("/api/review", params, function (err, response) {
        if (err) {
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }
        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: response.results
        });
      });
    };
  },

  // Allow user to add new review to a hike
  reviewCreated: function (review, params) {
    return function (dispatch) {
      APIManager.post("/api/review", review, function (err, response) {
        if (err) {
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }
        var reviews = [response.result]; // <------? figure this out

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
      APIManager.put("/api/review/" + review.id, review, function (err, response) {
        if (err) {
          dispatch({ type: constants.ERROR_RECEIVED, message: err.message });
          return;
        }
        dispatch({
          type: constants.REVIEW_UPDATED,
          review: response.result
        });
      });
    };
  } };