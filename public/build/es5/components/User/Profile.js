"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ImageHelper = require("../../utils").ImageHelper;
var Profile = (function (Component) {
  function Profile(props) {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), "constructor", this).call(this, props);
  }

  _inherits(Profile, Component);

  _prototypeProperties(Profile, null, {
    render: {
      value: function render() {
        var image = this.props.profile.image == null ? "" : ImageHelper.profile(this.props.profile.image, 300);

        return React.createElement(
          "div",
          { className: "profile-block" },
          React.createElement("img", { className: "account-image", src: image }),
          React.createElement(
            "div",
            { className: "profile-name-block" },
            React.createElement(
              "div",
              { className: "profile-title profile-name-title" },
              "Name: "
            ),
            React.createElement(
              "span",
              { className: "profile-name" },
              this.props.profile.firstName
            ),
            React.createElement(
              "span",
              null,
              " "
            ),
            React.createElement(
              "span",
              { className: "profile-name" },
              this.props.profile.lastName
            )
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "profile-city-block" },
            React.createElement(
              "div",
              { className: "profile-title profile-city-title" },
              "City: "
            ),
            React.createElement(
              "span",
              { className: "profile-city" },
              this.props.profile.city
            )
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "profile-bio-block" },
            React.createElement(
              "div",
              { className: "profile-title" },
              "Bio :"
            ),
            React.createElement(
              "p",
              { className: "profile-bio" },
              this.props.profile.bio
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Profile;
})(Component);

module.exports = Profile;