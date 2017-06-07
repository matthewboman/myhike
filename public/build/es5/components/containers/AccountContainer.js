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

var actions = _interopRequire(require("../../actions"));

var _utils = require("../../utils");

var ImageHelper = _utils.ImageHelper;
var ImageUploader = _utils.ImageUploader;
var _User = require("../User");

var AccountEditor = _User.AccountEditor;
var UserReviews = _User.UserReviews;
var Navbar = require("./").Navbar;
var AccountContainer = (function (Component) {
  function AccountContainer() {
    _classCallCheck(this, AccountContainer);

    _get(Object.getPrototypeOf(AccountContainer.prototype), "constructor", this).call(this);
    this.state = {
      updated: {
        image: ""
      },
      updateImage: false,
      showNevermind: false
    };
  }

  _inherits(AccountContainer, Component);

  _prototypeProperties(AccountContainer, null, {
    componentDidMount: {
      value: function componentDidMount() {
        this.props.fetchReviews({ "user.id": this.props.user.id });
      },
      writable: true,
      configurable: true
    },
    toggleImageUploader: {
      value: function toggleImageUploader() {
        this.setState({ updateImage: !this.state.updateImage });
      },
      writable: true,
      configurable: true
    },
    uploadImage: {
      value: function uploadImage(files) {
        var _this = this;
        var image = files[0];
        ImageUploader.upload(image, function (results) {
          var updatedProfile = Object.assign({}, _this.props.user);
          updatedProfile.image = results.secure_url;
          _this.setState({
            updated: updatedProfile,
            showNevermind: true
          });
        });
      },
      writable: true,
      configurable: true
    },
    updatePhoto: {
      value: function updatePhoto(event) {
        if (this.state.updated.image == "") {
          this.setState({ updateImage: false });
          return;
        }
        this.props.profileUpdated(this.props.user, this.state.updated);
        this.setState({ updateImage: false });
      },
      writable: true,
      configurable: true
    },
    submitUpdate: {
      value: function submitUpdate(profile) {
        this.props.profileUpdated(this.props.user, profile);
      },
      writable: true,
      configurable: true
    },
    updateImage: {
      value: function updateImage() {
        if (this.state.updateImage == true) {
          return React.createElement(
            "div",
            { className: "update-profile-image" },
            React.createElement(Dropzone, { onDrop: this.uploadImage.bind(this) }),
            React.createElement("br", null),
            React.createElement("img", { className: "image-preview",
              src: this.state.updated.image == "" ? "" : ImageHelper.preview(this.state.updated.image, 325, 300) }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { className: "btn", onClick: this.updatePhoto.bind(this) },
              "Update"
            ),
            React.createElement(
              "span",
              null,
              "  "
            ),
            React.createElement(
              "button",
              { className: "btn", onClick: this.toggleImageUploader.bind(this) },
              "Nevermind"
            )
          );
        } else {
          return React.createElement(
            "div",
            { className: "change-button" },
            React.createElement(
              "button",
              { className: "btn change", onClick: this.toggleImageUploader.bind(this) },
              "Change profile picture"
            )
          );
        }
      },
      writable: true,
      configurable: true
    },
    renderProfile: {
      value: function renderProfile() {
        var image = this.props.user.image == null ? "" : ImageHelper.profile(this.props.user.image, 300);
        return React.createElement(
          "div",
          { className: "account-image-box" },
          React.createElement("img", { className: "account-image", src: image }),
          React.createElement("br", null),
          this.updateImage(),
          React.createElement(
            "div",
            { className: "bio-block" },
            React.createElement(AccountEditor, {
              profile: this.props.user,
              onUpdate: this.submitUpdate.bind(this) })
          )
        );
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "container-fluid" },
          React.createElement(
            "div",
            { className: "account-header" },
            "Welcome ",
            this.props.user.username
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-4" },
              this.renderProfile()
            ),
            React.createElement(
              "div",
              { className: "col-md-8" },
              React.createElement(UserReviews, { user: this.props.user,
                reviews: this.props.reviews,
                displayIn: "account" })
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return AccountContainer;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user,
    reviews: state.review.reviewMap
  };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchReviews: function (params) {
      return dispatch(actions.fetchReviews(params));
    },
    getCurrentUserReviews: function (user) {
      return dispatch(actions.getCurrentUserReviews(user));
    },
    profileUpdated: function (user, profile) {
      return dispatch(actions.profileUpdated(user, profile));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(AccountContainer);