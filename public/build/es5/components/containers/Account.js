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
var Dropzone = _interopRequire(require("react-dropzone"));

var sha1 = _interopRequire(require("sha1"));

var actions = _interopRequire(require("../../actions"));

var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var ImageUploader = _utils.ImageUploader;
var AccountEditor = require("../presentation").AccountEditor;
var Navbar = require("../layout").Navbar;


/*
  TODO: move API logic to ImageUploader
  TODO: multiple photo capabilities
*/

var Account = (function (Component) {
  function Account() {
    _classCallCheck(this, Account);

    _get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this);
    this.state = {
      updated: {}
    };
  }

  _inherits(Account, Component);

  _prototypeProperties(Account, null, {
    uploadImage: {
      value: function uploadImage(files) {
        var _this = this;
        // Select first image
        var image = files[0];
        // Prep Coudinary
        var cloudName = "dotkbdwdw";
        var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
        // Prep PARAMS
        var upload_preset = "me0nxa6b";
        var API_Secret = "i3ngvXSllacuFCrG_SCVwbfa1WI";
        var timestamp = Date.now() / 1000; // they want seconds, not miliseconds
        var paramsStr = "timestamp=" + timestamp + "&upload_preset=" + upload_preset + API_Secret;
        var signature = sha1(paramsStr);

        var params = {
          api_key: "614624198613471",
          timestamp: timestamp,
          upload_preset: upload_preset,
          signature: signature
        };
        // Upload image to Cloudinary
        APIManager.upload(url, image, params, function (err, response) {
          if (err) {
            console.error(err);
            return;
          }
          var updatedProfile = Object.assign({}, _this.props.user);
          updatedProfile.image = response.body.secure_url;
          _this.setState({
            updated: updatedProfile
          });
        });
      },
      writable: true,
      configurable: true
    },
    updatePhoto: {
      value: function updatePhoto(event) {
        this.props.profileUpdated(this.props.user, this.state.updated);
      },
      writable: true,
      configurable: true
    },
    submitUpdate: {
      value: function submitUpdate(profile) {
        console.log("just updated " + JSON.stringify(profile));
        this.props.profileUpdated(this.props.user, profile);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var profile = this.props.user;
        var image = profile.image == null ? "" : ImageHelper.thumbnail(profile.image, 250);

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "Welcome ",
            profile.username
          ),
          React.createElement("img", { src: image }),
          React.createElement("br", null),
          React.createElement(Dropzone, { onDrop: this.uploadImage.bind(this) }),
          React.createElement(
            "button",
            { onClick: this.updatePhoto.bind(this) },
            "Update Photo"
          ),
          React.createElement("br", null),
          React.createElement(AccountEditor, {
            profile: profile,
            onUpdate: this.submitUpdate.bind(this) })
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Account;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    profileUpdated: function (user, profile) {
      return dispatch(actions.profileUpdated(user, profile));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Account);