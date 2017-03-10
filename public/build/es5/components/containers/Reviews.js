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
var _presentation = require("../presentation");

var CreateReview = _presentation.CreateReview;
var Review = _presentation.Review;


/*
  TODO: Hike can be submitted only if user is logged in and location is selected
*/

var Reviews = (function (Component) {
  function Reviews() {
    _classCallCheck(this, Reviews);

    _get(Object.getPrototypeOf(Reviews.prototype), "constructor", this).call(this);
    this.checkForReviews = this.checkForReviews.bind(this);
    this.state = {
      addReview: false
    };
  }

  _inherits(Reviews, Component);

  _prototypeProperties(Reviews, null, {
    checkForReviews: {

      // Get hike and reviews up and loaded before component renders
      value: function checkForReviews() {
        var hike = this.props.currentHike;
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
    displayCreateReviewComponent: {

      // Show/hide CreateReview component
      value: function displayCreateReviewComponent(event) {
        this.setState({
          addReview: !this.state.addReview
        });
      },
      writable: true,
      configurable: true
    },
    submitReview: {

      // Add new hike review to DB
      value: function submitReview(review) {
        // check if user is logged in
        // if (this.props.user == null) {
        //   alert('You must be signed up')
        //   return
        // }
        var updatedReview = Object.assign({}, review);
        var hikeId = this.props.currentHike.id;
        updatedReview.hikeId = hikeId;
        this.setState({
          addReview: !this.state.addReview
        });

        this.props.reviewCreated(updatedReview, hikeId);
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
        /*
        Show/hide CreateReview component
        */
        var newReview = undefined;

        if (this.state.addReview == true) {
          newReview = React.createElement(
            "div",
            null,
            React.createElement(CreateReview, { onReview: this.submitReview.bind(this) })
          );
        } else {
          newReview = React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { onClick: this.displayCreateReviewComponent.bind(this) },
              "Add a Review"
            )
          );
        }

        /*
        Make sure component has what it needs to display reviews
        */
        var currentHike = this.props.currentHike;
        var hikeName = null;
        var reviewList = null;

        if (currentHike != null) {
          var hikeReviews = this.props.reviews[currentHike.id];

          if (hikeReviews != null) {
            reviewList = hikeReviews.map(function (review, i) {
              return React.createElement(
                "li",
                { key: i },
                React.createElement(Review, { currentReview: review })
              );
            });
          }
        }

        return React.createElement(
          "div",
          { className: "sidebar" },
          newReview,
          React.createElement("br", null),
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

  return Reviews;
})(Component);

var stateToProps = function (state) {
  return {
    currentHike: state.hike.currentHike,
    reviews: state.review.reviewMap
  };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchReviews: function (params) {
      return dispatch(actions.fetchReviews(params));
    },
    reviewCreated: function (review, hikeId) {
      return dispatch(actions.reviewCreated(review, hikeId));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(Reviews);