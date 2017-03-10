"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  reviewMap: {}
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);
  var updatedMap = Object.assign({}, updatedState.reviewMap);

  switch (action.type) {

    case constants.REVIEWS_RECEIVED:
      console.log("REVIEWS_RECEIVED " + JSON.stringify(action.reviews));
      var keys = Object.keys(action.params);
      var key = keys[0];
      var value = action.params[key];
      var array = updatedMap[value] ? updatedMap[value] : [];

      action.reviews.forEach(function (review, i) {
        array.push(review);
      });

      updatedMap[value] = array;
      updatedState.reviewMap = updatedMap;

      return updatedState;

    default:
      return state;
  }
};