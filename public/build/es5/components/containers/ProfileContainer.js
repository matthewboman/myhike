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
var actions = _interopRequire(require("../../actions"));

var _utils = require("../../utils");

var ImageHelper = _utils.ImageHelper;
var ImageUploader = _utils.ImageUploader;
var UserReviews = require("../User").UserReviews;
var Navbar = require("./").Navbar;
var ProfileContainer = (function (Component) {
  function ProfileContainer() {
    _classCallCheck(this, ProfileContainer);

    _get(Object.getPrototypeOf(ProfileContainer.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(ProfileContainer, Component);

  _prototypeProperties(ProfileContainer, null, {
    componentDidMount: {
      value: function componentDidMount() {
        this.props.fetchReviews({ "user.id": this.props.params.id });
        this.props.fetchProfile(this.props.params.id);
      },
      writable: true,
      configurable: true
    },
    renderProfile: {
      value: function renderProfile() {
        var profile = this.props.profiles[this.props.params.id];
        if (profile) {
          return React.createElement(
            "div",
            { className: "account-image-box" },
            React.createElement(
              "h3",
              null,
              profile.username
            ),
            React.createElement("img", { className: "account-image", src: ImageHelper.profile(profile.image, 300) }),
            React.createElement("br", null),
            React.createElement(
              "div",
              { className: "bio-block" },
              React.createElement(
                "span",
                { className: "profile-city" },
                profile.city
              ),
              React.createElement(
                "p",
                { className: "bio" },
                profile.bio
              )
            )
          );
        }
      },
      writable: true,
      configurable: true
    },
    renderReviews: {
      value: function renderReviews() {
        if (this.props.profiles[this.props.params.id] && this.props.reviews) {
          return React.createElement(UserReviews, { profile: this.props.profiles[this.props.params.id],
            reviews: this.props.reviews,
            displayIn: "profile" });
        }
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
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
            this.renderReviews()
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return ProfileContainer;
})(Component);

var stateToProps = function (state) {
  return {
    reviews: state.review.reviewMap,
    profiles: state.profile.profileMap };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchReviews: function (params) {
      return dispatch(actions.fetchReviews(params));
    },
    fetchProfile: function (id) {
      return dispatch(actions.fetchProfile(id));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(ProfileContainer);