"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  currentHike: null,
  userLocation: null,
  hikeLocation: null,
  // not sure if below are used
  reviewMap: {},
  hikeMap: {},
  list: [] };


module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updated = Object.assign({}, state);

  switch (action.type) {
    // Opens clicked-on hike in new window
    case constants.CURRENT_HIKE_RECEIVED:
      // console.log('CURRENT_HIKE_RECEIVED ' + JSON.stringify(action.currentHike))
      updated.currentHike = action.currentHike;
      return updated;

    // Handles user location from browser
    case constants.USER_LOCATION_RECEIVED:
      // console.log('USER_LOCATION_RECEIVED ' + JSON.stringify(action.position))
      updated.userLocation = action.position;
      return updated;

    // Controls new hike marker on map
    case constants.MARK_HIKE_LOCATION:
      // console.log('MARK_HIKE_LOCATION ' + JSON.stringify(action.location))
      updated.hikeLocation = action.location;
      return updated;

    default:
      return state;
  }
};