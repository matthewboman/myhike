"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  appStatus: "ready",
  list: []
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);

  switch (action.type) {

    case constants.HIKE_ADDED:
      console.log("HIKE_ADDED: " + JSON.stringify(action.hike));
      updatedState.list.push(action.hike);
      return updatedState;

    case constants.HIKES_RECEIVED:
      // console.log('HIKES_RECEIVED ' + JSON.stringify(action.hikes))
      updatedState.list = action.hikes;
      updatedState.appStatus = "ready";
      return updatedState;

    case constants.APPLICATION_STATE:
      if (action.reducer != "hike") {
        return updatedState;
      }
      updatedState.appStatus = action.status;
      return updatedState;

    default:
      return state;
  }
};