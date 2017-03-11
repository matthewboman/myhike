"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  user: null
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);

  switch (action.type) {
    // Assign 'currentUser' property when new user signs up
    case constants.PROFILE_CREATED:
      updatedState.user = action.profile;
      return updatedState;

    // Assign 'currentUser' property when returning user logs in
    case constants.CURRENT_USER_RECEIVED:
      console.log("CURRENT_USER_RECEIVED: " + JSON.stringify(action.user));
      updatedState.user = action.user;
      console.log("updatedState " + JSON.stringify(updatedState));
      return updatedState;

    default:
      return state;
  }
};