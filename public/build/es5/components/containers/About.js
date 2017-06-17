"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var About = (function (Component) {
  function About() {
    _classCallCheck(this, About);

    _get(Object.getPrototypeOf(About.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(About, Component);

  _prototypeProperties(About, null, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "about-page-container" },
          React.createElement(
            "div",
            { className: "about-block" },
            React.createElement(
              "div",
              { className: "about-section-title" },
              "Hikers"
            ),
            React.createElement(
              "div",
              { className: "about-section-content" },
              "Do you have so many good places you just can't remember them all? Or maybe you are traveling, have just moved somewhere new, or are just out of new ideas? Myhike allows you to post locations and reviews of your hikes and search for hikes others have added based on location."
            ),
            React.createElement(
              "div",
              { className: "about-section-title" },
              "Foragers"
            ),
            React.createElement(
              "div",
              { className: "about-section-content" },
              "Ever forget to mark that one spot with that really sweet find? Aside from allowing users to leave hike reviews and descriptions, there are also fields specifically for plants and mushrooms you find."
            ),
            React.createElement(
              "div",
              { className: "about-section-title" },
              "Ecologists"
            ),
            React.createElement(
              "div",
              { className: "about-section-content" },
              "Myhike strives to serve as a public database of species dispersal. On top of photo-uploading capabilities, Myhike also allows users to share where they've seen different animals, plants, and fungi. Any details you want can be found making requests to our public API at '[sitename]/api/reviews'"
            )
          ),
          React.createElement("div", { className: "line" }),
          React.createElement(
            "div",
            { className: "dev" },
            React.createElement(
              "p",
              null,
              "My Hike is always evolving. Feel free to contact us with feature suggestions or check out our Github to see how you can contribute."
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return About;
})(Component);

module.exports = About;