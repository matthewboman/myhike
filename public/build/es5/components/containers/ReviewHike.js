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

var APIManager = require("../../utils").APIManager;
var CreateReview = require("../presentation").CreateReview;
var CreateHike = (function (Component) {
  function CreateHike() {
    _classCallCheck(this, CreateHike);

    _get(Object.getPrototypeOf(CreateHike.prototype), "constructor", this).call(this);
    this.checkForReviews = this.checkForReviews.bind(this);
    this.state = {};
  }

  _inherits(CreateHike, Component);

  _prototypeProperties(CreateHike, null, {
    checkForReviews: {
      value: function checkForReviews() {
        var hike = this.props.currentHike;
        if (hike == null) {
          return;
        }

        var reviewsArray = this.props.reviews[hike.id];
        if (reviewsArray != null) {
          console.log(reviewsArray);
          return;
        }
        this.props.fetchReviews({ hikeId: hike.id });
      },
      writable: true,
      configurable: true
    },
    submitReview: {
      value: function submitReview(review) {
        console.log("submitting " + JSON.stringify(review));
      },
      writable: true,
      configurable: true
    },
    componentDidMount: {
      value: function componentDidMount() {
        console.log("user is " + JSON.stringify(this.props.user));
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var user = this.props.user;
        // if (this.props.currentUser == null || undefined) { return false }

        return React.createElement(
          "div",
          { className: "sidebar" },
          React.createElement(CreateReview, {
            user: user,
            onReview: this.submitReview.bind(this) })
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CreateHike;
})(Component);

var stateToProps = function (state) {
  return {
    location: state.hike.hikeLocation,
    currentHike: state.hike.currentHike,
    user: state.account.user,
    reviews: state.review.reviewMap
  };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchReviews: function (params) {
      return dispatch(actions.fetchReviews(params));
    },
    locationAdded: function (location) {
      return dispatch(actions.locationAdded(location));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(CreateHike);
// APIManager.post('/api/hike', this.state.hike, (err, response) => {
//   if (err) {
//     console.error('ERROR: ' + err.message)
//   }
// })