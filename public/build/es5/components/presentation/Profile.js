"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Profile = (function (Component) {
  function Profile() {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), "constructor", this).call(this);
    this.state = {
      profile: {
        username: "",
        firstName: "",
        lastName: "",
        bio: "",
        city: "",
        image: "",
        email: ""
      }
    };
  }

  _inherits(Profile, Component);

  _prototypeProperties(Profile, null, {
    updateProfile: {
      value: function updateProfile(event) {
        event.preventDefault();
        var upodateProfile = Object.assign({}, this.state.profile);
        updatedProfile[event.target.id] = event.target.value;
        this.setState({
          profile: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement("div", null);
      },
      writable: true,
      configurable: true
    }
  });

  return Profile;
})(Component);

module.exports = Profile;