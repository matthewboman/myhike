"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var combineReducers = _redux.combineReducers;
var applyMiddleware = _redux.applyMiddleware;
var createStore = _redux.createStore;
var thunk = _interopRequire(require("redux-thunk"));

var _reducers = require("../reducers");

var accountReducer = _reducers.accountReducer;
var hikeReducer = _reducers.hikeReducer;
var mapReducer = _reducers.mapReducer;


var store;

module.exports = {

  configureStore: function (initial) {
    // combine all reducers
    var reducers = combineReducers({
      account: accountReducer,
      hike: hikeReducer,
      map: mapReducer });

    store = createStore(reducers, initial, applyMiddleware(thunk));

    return store;
  },

  currentStore: function () {
    return store;
  }

};