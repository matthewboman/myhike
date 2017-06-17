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
var browserHistory = require("react-router").browserHistory;
var actions = _interopRequire(require("../../actions"));

var APIManager = require("../../utils").APIManager;
var _Reviews = require("../Reviews");

var CreateReview = _Reviews.CreateReview;
var HikeReviews = _Reviews.HikeReviews;
var Hike = (function (Component) {
  function Hike() {
    _classCallCheck(this, Hike);

    _get(Object.getPrototypeOf(Hike.prototype), "constructor", this).call(this);
    this.state = {
      addReview: false
    };
  }

  _inherits(Hike, Component);

  _prototypeProperties(Hike, null, {
    componentDidUpdate: {
      value: function componentDidUpdate() {
        if (this.props.hike == null) {
          return;
        }
      },
      writable: true,
      configurable: true
    },
    displayCreateReviewComponent: {
      value: function displayCreateReviewComponent(event) {
        if (!this.props.user) {
          this.props.displayMessage("You must be logged in to add a review");
          return;
        }
        this.setState({ addReview: !this.state.addReview });
      },
      writable: true,
      configurable: true
    },
    submitReview: {
      value: function submitReview(review) {
        this.props.reviewCreated(review, this.props.hike);
        this.setState({ addReview: !this.state.addReview });
      },
      writable: true,
      configurable: true
    },
    renderHikeName: {
      value: function renderHikeName() {
        if (!this.props.hike) {
          return null;
        }return React.createElement(
          "div",
          { className: "hike-name" },
          this.props.hike.name
        );
      },
      writable: true,
      configurable: true
    },
    renderCreateReviewOption: {
      value: function renderCreateReviewOption() {
        if (this.state.addReview == true) {
          return React.createElement(CreateReview, {
            user: this.props.user,
            hike: this.props.hike,
            onReview: this.submitReview.bind(this) });
        } else {
          return React.createElement(
            "div",
            { className: "add-review-block" },
            React.createElement(
              "span",
              { className: "add-review", onClick: this.displayCreateReviewComponent.bind(this) },
              "Add a Review"
            )
          );
        }
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "hike-sidebar" },
          this.renderHikeName(),
          React.createElement(
            "span",
            { className: "error" },
            this.props.message
          ),
          this.renderCreateReviewOption(),
          React.createElement(HikeReviews, null)
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Hike;
})(Component);

var stateToProps = function (state) {
  return {
    hike: state.hike.currentHike,
    message: state.message.message,
    user: state.account.user };
};

var dispatchToProps = function (dispatch) {
  return {
    displayMessage: function (message) {
      return dispatch(actions.displayMessage(message));
    },
    fetchHike: function (params) {
      return dispatch(actions.fetchHike(params));
    },
    reviewCreated: function (review, params) {
      return dispatch(actions.reviewCreated(review, params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Hike);