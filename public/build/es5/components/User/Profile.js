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

var ImageHelper = require("../../utils").ImageHelper;
var Profile = (function (Component) {
  function Profile() {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(Profile, Component);

  _prototypeProperties(Profile, null, {
    componentDidMount: {
      value: function componentDidMount() {
        var profile = this.props.profiles[this.props.id];

        if (profile == null) {
          this.props.fetchProfile(this.props.id);
          return;
        }
        if (this.props.reviews[profile.id] != null) {
          return;
        }
        this.props.fetchReviews({ "user.id": profile.id });
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        var profile = this.props.profiles[this.props.id];
        if (profile == null) {
          return;
        }
        if (this.props.reviews[profile.id] != null) {
          return;
        }
        this.props.fetchReviews({ "user.id": profile.id });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var profile = this.props.profiles[this.props.id];
        var page = null;
        console.log("profile is " + JSON.stringify(profile));

        // Make sure we have everything, then get reviews user has made
        if (profile != null) {
          var reviews = this.props.reviews[profile.id] ? this.props.reviews[profile.id] : [];
          var list = reviews.map(function (review, i) {
            return React.createElement(
              "li",
              { key: i, className: "review-block" },
              React.createElement(
                "h4",
                { className: "review-header" },
                "Review/description: "
              ),
              React.createElement(
                "p",
                { className: "review-description" },
                review.description
              ),
              React.createElement(
                "h4",
                { className: "review-header" },
                "Animals spotted: "
              ),
              React.createElement(
                "p",
                { className: "review-animals" },
                review.animals
              ),
              React.createElement(
                "h4",
                { className: "review-header" },
                "Plants identified: "
              ),
              React.createElement(
                "p",
                { className: "review-plants" },
                review.plants
              ),
              React.createElement(
                "h4",
                { className: "review-header" },
                "Mushrooms and other fungi: "
              ),
              React.createElement(
                "p",
                { className: "review-fungi" },
                review.fungi
              )
            );
          });
          page = React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-4" },
              React.createElement(
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
              )
            ),
            React.createElement(
              "div",
              { className: "col-md-8" },
              React.createElement(
                "h3",
                null,
                "Reviews"
              ),
              React.createElement(
                "ul",
                { className: "reviews" },
                list
              )
            )
          );
        }

        return React.createElement(
          "div",
          { className: "container-fluid" },
          page
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Profile;
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

module.exports = connect(stateToProps, dispatchToProps)(Profile);