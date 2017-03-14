"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  hikeLocation: null,
  list: [],
  selectedHike: 0,
  currentHike: null,
  center: null,
  reviewMap: {},
  hikeMap: {}
};


module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updated = Object.assign({}, state);

  switch (action.type) {
    // Set hike location on map click
    case constants.CURRENT_HIKE_RECEIVED:
      // console.log('CURRENT_HIKE_RECEIVED ' + JSON.stringify(action.currentHike))
      updated.currentHike = action.currentHike;
      return updated;

    // Hike marker on map clicked
    case constants.HIKE_SELECTED:
      // console.log('HIKE_SELECTED ' + JSON.stringify(action.hike))
      updated.selectedHike = action.hike;
      return updated;

    // (For adding a new hike) set location to where user clicks on map
    case constants.LOCATION_ADDED:
      // console.log('LOCATION_ADDED ' + JSON.stringify(action.location))
      updated.hikeLocation = action.location;
      return updated;

    // User location gotten from browser
    case constants.USER_LOCATION_RECEIVED:
      console.log("USER_LOCATION_RECEIVED " + JSON.stringify(action.center));
      updated.center = action.center;
      return updated;

    default:
      return state;
  }
};