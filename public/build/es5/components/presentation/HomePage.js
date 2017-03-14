"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var HomePage = (function (Component) {
  function HomePage() {
    _classCallCheck(this, HomePage);

    if (Component != null) {
      Component.apply(this, arguments);
    }
  }

  _inherits(HomePage, Component);

  _prototypeProperties(HomePage, null, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "sidebar" },
          React.createElement(
            "h2",
            null,
            "Welcome"
          ),
          React.createElement(
            "div",
            { className: "hikeBlock" },
            React.createElement(
              "p",
              null,
              "My Hike is sort of like a social network meets wikipedia meets public database. This site allows nature enthusiasts to share their favorite spots and foragers their best finds, as well as provide a public database of species dispersal to measure the effects of climate change on different ecosystems."
            ),
            React.createElement(
              "p",
              null,
              "If you have hikes to share, you can register and start posting. If youre just here to look around, everything is public and free--just click on a marker to get a hikes details."
            )
          ),
          React.createElement(
            "div",
            { className: "hikeBlock" },
            React.createElement(
              "p",
              null,
              "My Hike is currently in development phase. Here are some things we could use help with: allowing users to edit their own hikes but not others, enabling photo-sharing capability, making hikes searchable by description or wildlife."
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return HomePage;
})(Component);

module.exports = HomePage;