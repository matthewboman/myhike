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
var Map = require("../containers").Map;


/*
NOT CURRENTLY IMPLEMENTED
*/


var Container = (function (Component) {
  function Container() {
    _classCallCheck(this, Container);

    _get(Object.getPrototypeOf(Container.prototype), "constructor", this).call(this);
    this.state = {
      // height: (window.innerHeight-50),
      height: window.innerWidth,
      width: window.innerWidth
    };
  }

  _inherits(Container, Component);

  _prototypeProperties(Container, null, {
    render: {
      value: function render() {
        var mapContainer = React.createElement("div", { style: { height: this.state.height, width: this.state.width } });

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "nav" },
            React.createElement(Nav, null)
          ),
          React.createElement(
            "div",
            { className: "row small-map" },
            React.createElement(
              "div",
              { className: "col-xs-12" },
              React.createElement(Map, {
                mapContainer: mapContainer
              })
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-12" },
              this.props.children
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Container;
})(Component);

module.exports = Container;