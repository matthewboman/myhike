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
var UserReviews = (function (Component) {
  function UserReviews() {
    _classCallCheck(this, UserReviews);

    _get(Object.getPrototypeOf(UserReviews.prototype), "constructor", this).call(this);
    // this.checkForReviews = this.checkForReviews.bind(this)
    this.state = {};
  }

  _inherits(UserReviews, Component);

  _prototypeProperties(UserReviews, null, {
    render: {

      // // Get hike and reviews up and loaded before component renders
      // checkForReviews() {
      //   if (!this.props.user) {
      //     console.log("no user")
      //     return
      //   }
      //   // let user = this.props.user
      //   // let reviewsArray = this.props.reviews[user.id]
      //   // if (reviewsArray != null) {
      //   //   return
      //   // }
      //   // this.props.fetchReviews({user: user.id})
      //   const profile = this.props.user
      //
      //   if (this.props.reviews[profile.id] != null) {
      //     return
      //   }
      //   this.props.fetchReviews({'user.id': profile.id})
      // }

      // Allow user to edit their hike review
      // updateReview(review) {
      //   this.props.reviewUpdated(review)
      // }

      // componentDidMount() {
      //   this.checkForReviews()
      // }
      //
      // componentDidUpdate() {
      //   this.checkForReviews()
      // }

      value: function render() {
        // if (currentUser != null) {
        //   let userReviews = this.props.reviews[currentUser.id]
        //   if (userReviews != null) {
        //     reviewList = userReviews.map((review, i) => {
        //       return (
        //         <li key={i}>
        //           <Review
        //             onUpdate={this.updateReview.bind(this)}
        //             isEditable={true}
        //             review={review} />
        //         </li>
        //       )
        //     })
        //   }
        // }
        // let list = []
        // if (currentUser != null) {
        //   const reviews = (this.props.reviews[currentUser.id]) ? this.props.reviews[currentUser.id] : []
        //   list = reviews.map((review, i) => {
        //     return (
        //       <li key={i} className="review-block">
        //         <h4 className="review-header">Review/description: </h4>
        //         <p className="review-description">
        //           {review.description}
        //         </p>
        //         <h4 className="review-header">Animals spotted: </h4>
        //         <p className="review-animals">
        //           {review.animals}
        //         </p>
        //         <h4 className="review-header">Plants identified: </h4>
        //         <p className="review-plants">
        //           {review.plants}
        //         </p>
        //         <h4 className="review-header">Mushrooms and other fungi: </h4>
        //         <p className="review-fungi">
        //           {review.fungi}
        //         </p>
        //       </li>
        //     )
        //   })
        // }

        // return (
        //   <ul className="reviews">
        //     {list}
        //   </ul>
        // )
        return React.createElement(
          "div",
          { className: "reviews" },
          "nah"
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