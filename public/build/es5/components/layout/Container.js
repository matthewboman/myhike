"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _reactResizable = require("react-resizable");

var Resizable = _reactResizable.Resizable;
var ResizableBox = _reactResizable.ResizableBox;
var connect = require("react-redux").connect;
var Map = require("../containers").Map;
var Nav = require("./").Nav;


/*
  NOT BEING USED FOR SERVER-SIDE RENDERING

  
  TODO: The left/right component isn't working entirely how I want it too. Also,
    I should make it more obvious that right/left components can be resized.
*/

var Container = (function (Component) {
  function Container() {
    _classCallCheck(this, Container);

    _get(Object.getPrototypeOf(Container.prototype), "constructor", this).call(this);
    this.state = {
      // height: window.innerHeight-70,
      // leftWidth: (window.innerWidth/2),
      // rightWidth: (window.innerWidth/2),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 70,
      leftWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2,
      rightWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2 };
  }

  _inherits(Container, Component);

  _prototypeProperties(Container, null, {
    onResize: {

      // Adjust right and left component size
      value: function onResize(event, _ref) {
        var element = _ref.element;
        var size = _ref.size;
        this.setState({
          leftWidth: size.width,
          rightWidth: window.innerWidth - size.width
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var mapContainer = React.createElement("div", { style: { height: this.state.height, width: this.state.leftWidth } });

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "nav" },
            React.createElement(Nav, null)
          ),
          React.createElement(
            ResizableBox,
            { className: "left",
              width: this.state.leftWidth, height: this.state.height,
              axis: "x",
              onResize: this.onResize.bind(this) },
            React.createElement(Map, {
              mapContainer: mapContainer
            })
          ),
          React.createElement(
            ResizableBox,
            { className: "right",
              width: this.state.rightWidth, height: this.state.height,
              axis: "x" },
            this.props.children
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
// console.log('Width of left component is ' + this.state.leftWidth + 'px')
// console.log('Width of right component is ' + this.state.rightWidth + 'px')