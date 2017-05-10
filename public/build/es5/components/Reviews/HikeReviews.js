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

var store = _interopRequire(require("../../store/store"));

var APIManager = require("../../utils").APIManager;
var Review = require("./").Review;
var HikeReviews = (function (Component) {
  function HikeReviews() {
    _classCallCheck(this, HikeReviews);

    _get(Object.getPrototypeOf(HikeReviews.prototype), "constructor", this).call(this);
    this.checkForReviews = this.checkForReviews.bind(this);
    this.state = {};
  }

  _inherits(HikeReviews, Component);

  _prototypeProperties(HikeReviews, null, {
    checkForReviews: {

      // Get hike and reviews up and loaded before component renders
      value: function checkForReviews() {
        var hike = this.props.hike;
        if (hike == null) {
          return;
        }
        var reviewsArray = this.props.reviews[hike.id];
        if (reviewsArray != null) {
          return;
        }
        this.props.fetchReviews({ hikeId: hike.id });
      },
      writable: true,
      configurable: true
    },
    updateReview: {

      // Allow user to edit their hike review
      value: function updateReview(review) {
        this.props.reviewUpdated(review);
      },
      writable: true,
      configurable: true
    },
    componentDidMount: {
      value: function componentDidMount() {
        this.checkForReviews();
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        this.checkForReviews();
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;


        // Make sure component has what it needs to display reviews
        var hike = this.props.hike;
        var currentUser = this.props.user;
        var reviewList = null;

        if (hike != null) {
          var hikeReviews = this.props.reviews[hike.id];

          if (hikeReviews != null) {
            reviewList = hikeReviews.map(function (review, i) {
              var editable = false;
              if (currentUser != null) {
                editable = currentUser.id == review.user.id;
              }
              return React.createElement(
                "li",
                { key: i },
                React.createElement(Review, {
                  onUpdate: _this.updateReview.bind(_this),
                  isEditable: editable,
                  review: review })
              );
            });
          }
        }

        return React.createElement(
          "div",
          null,
          React.createElement(
            "ul",
            { className: "reviews" },
            reviewList
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return HikeReviews;
})(Component);

var stateToProps = function (state) {
  return {
    hike: state.hike.currentHike,
    reviews: state.review.reviewMap,
    user: state.account.user };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchReviews: function (params) {
      return dispatch(actions.fetchReviews(params));
    },
    reviewUpdated: function (review) {
      return dispatch(actions.reviewUpdated(review));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(HikeReviews);