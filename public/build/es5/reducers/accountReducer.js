"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  user: null
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updated = Object.assign({}, state);

  switch (action.type) {
    // Assign 'currentUser' property when new user signs up
    case constants.PROFILE_CREATED:
      updated.currentUser = action.profile;
      return updated;

    // Assign 'currentUser' property when returning user logs in
    case constants.CURRENT_USER_RECEIVED:
      updated.currentUser = action.profile;
      return updated;

    default:
      return state;
  }
};