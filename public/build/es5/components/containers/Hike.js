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
var HikeReviews = _interopRequire(require("./HikeReviews"));

var CreateReview = require("../presentation").CreateReview;
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
      value: function submitReview(review) {
        if (this.props.user == null) {
          console.log("You must be logged in to post a review");
          return;
        }
        console.log(JSON.stringify(review));
        this.props.reviewCreated(review, this.props.hike);
        this.setState({
          addReview: !this.state.addReview
        });
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        var hike = this.props.hike;
        if (hike == null) {
          return;
        }
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var hike = this.props.hike;
        var user = this.props.user;

        //Make sure we have the hike info before rendering
        if (hike == null) {
          return false;
        }
        var header = React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            hike.name
          )
        );

        //Show/hide CreateReview component
        var newReview = undefined;

        if (this.state.addReview == true) {
          newReview = React.createElement(
            "div",
            null,
            React.createElement(CreateReview, {
              user: user,
              hike: this.props.hike,
              onReview: this.submitReview.bind(this) })
          );
        } else {
          newReview = React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { className: "btn", onClick: this.displayCreateReviewComponent.bind(this) },
              "Add a Review"
            )
          );
        }

        return React.createElement(
          "div",
          { className: "sidebar" },
          header,
          React.createElement(HikeReviews, null),
          newReview
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
    user: state.account.user };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchHike: function (params) {
      return dispatch(actions.fetchHike(params));
    },
    reviewCreated: function (review, params) {
      return dispatch(actions.reviewCreated(review, params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Hike);