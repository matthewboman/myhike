"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var browserHistory = require("react-router").browserHistory;
var actions = _interopRequire(require("../../actions"));

var APIManager = require("../../utils").APIManager;
var Reviews = _interopRequire(require("./Reviews"));

var Hike = (function (Component) {
  function Hike() {
    _classCallCheck(this, Hike);

    _get(Object.getPrototypeOf(Hike.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(Hike, Component);

  _prototypeProperties(Hike, null, {
    componentDidUpdate: {
      value: function componentDidUpdate() {
        var hike = this.props.hike;
        if (hike == null) {
          return;
        }
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var hike = this.props.hike;
        var header = undefined;

        if (hike != null) {
          header = React.createElement(
            "div",
            null,
            React.createElement(
              "h3",
              null,
              hike.name
            )
          );
        }

        return React.createElement(
          "div",
          { className: "sidebar" },
          header,
          React.createElement(Reviews, null)
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Hike;
})(Component);

var stateToProps = function (state) {
  return {
    hike: state.hike.currentHike };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchHike: function (params) {
      return dispatch(actions.fetchHike(params));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(Hike);