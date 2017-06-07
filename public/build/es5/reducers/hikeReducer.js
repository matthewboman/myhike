"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  currentHike: null,
  userLocation: null,
  clickedLocation: null,
  hikeLocation: null,
  usingMap: false
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updated = Object.assign({}, state);

  switch (action.type) {

    case constants.CURRENT_HIKE_RECEIVED:
      // console.log('CURRENT_HIKE_RECEIVED ' + JSON.stringify(action.currentHike))
      updated.currentHike = action.currentHike;
      return updated;

    case constants.USER_LOCATION_RECEIVED:
      // console.log('USER_LOCATION_RECEIVED ' + JSON.stringify(action.position))
      updated.userLocation = action.position;
      return updated;

    case constants.MARK_CLICKED_LOCATION:
      // console.log('MARK_CLICKED_LOCATION ' + JSON.stringify(action.location) + action.usingMap)
      updated.clickedLocation = action.location;
      updated.usingMap = action.usingMap;
      return updated;

    case constants.MARK_HIKE_LOCATION:
      // console.log('MARK_HIKE_LOCATION ' + JSON.stringify(action.location) + action.usingMap)
      updated.hikeLocation = action.location;
      updated.usingMap = action.usingMap;
      return updated;

    default:
      return state;
  }
};