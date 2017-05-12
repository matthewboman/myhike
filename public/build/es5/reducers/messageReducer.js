"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/*
For displaying front- and back-end errors to user
*/
var constants = _interopRequire(require("../constants"));

var initialState = {
  message: "",
  error: ""
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);

  switch (action.type) {

    case constants.MESSAGE_RECEIVED:
      console.log("MESSAGE RECEIVED: " + JSON.stringify(action.message));
      updatedState.message = action.message;
      return updatedState;

    case constants.ERROR_RECEIVED:
      console.log("ERROR_RECEIVED: " + action.message);
      updatedState.error = action.message;
      return updatedState;

    default:
      return state;
  }
};