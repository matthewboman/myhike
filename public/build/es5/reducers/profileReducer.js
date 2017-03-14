"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var intialState = {
  profileMap: {},
  imageMap: {}
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? intialState : arguments[0];
  var updatedState = Object.assign({}, state);
  var updatedProfileMap = Object.assign({}, updatedState.profileMap);

  switch (action.type) {

    // Link to user profile from comment
    case constants.PROFILE_RECEIVED:
      // console.log("PROFILE_RECEIVED: " + JSON.stringify(action.profile))
      updatedProfileMap[action.profile.id] = action.profile;
      updatedState.profileMap = updatedProfileMap;
      return updatedState;

    default:
      return state;
  }
};