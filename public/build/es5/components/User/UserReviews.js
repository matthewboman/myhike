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
var Review = require("../Reviews").Review;
var UserReviews = (function (Component) {
  function UserReviews() {
    _classCallCheck(this, UserReviews);

    _get(Object.getPrototypeOf(UserReviews.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(UserReviews, Component);

  _prototypeProperties(UserReviews, null, {
    updateReview: {
      value: function updateReview(review) {
        this.props.reviewUpdated(review);
      },
      writable: true,
      configurable: true
    },
    renderReviews: {
      value: function renderReviews() {
        var _this = this;
        var person = this.props.displayIn == "account" ? this.props.user : this.props.profile;
        if (this.props.reviews[person.id]) {
          return this.props.reviews[person.id].map(function (review, i) {
            return React.createElement(Review, { key: i,
              onUpdate: _this.updateReview.bind(_this),
              isEditable: _this.props.user ? _this.props.user.id == review.user.id : false,
              review: review });
          });
        }
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "reviews" },
          this.renderReviews()
        );
      },
      writable: true,
      configurable: true
    }
  });

  return UserReviews;
})(Component);

var stateToProps = function (state) {
  return {
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

module.exports = connect(stateToProps, dispatchToProps)(UserReviews);