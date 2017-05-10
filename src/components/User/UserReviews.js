import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import store from '../../store/store'
import { APIManager } from '../../utils'
import { Review } from './'

class UserReviews extends Component {
  constructor() {
    super()
    this.checkForReviews = this.checkForReviews.bind(this)
    this.state = {}
  }

  // Get hike and reviews up and loaded before component renders
  checkForReviews() {
    if (!this.props.user) {
      console.log("no user")
      return
    }
    // let user = this.props.user
    // let reviewsArray = this.props.reviews[user.id]
    // if (reviewsArray != null) {
    //   return
    // }
    // this.props.fetchReviews({user: user.id})
    const profile = this.props.user

    if (this.props.reviews[profile.id] != null) {
      return
    }
    this.props.fetchReviews({'user.id': profile.id})
  }

  // Allow user to edit their hike review
  updateReview(review) {
    this.props.reviewUpdated(review)
  }

  componentDidMount() {
    this.checkForReviews()
  }

  componentDidUpdate() {
    this.checkForReviews()
  }

  render() {

    // Make sure component has what it needs to display reviews
    // const hike = this.props.hike
    const currentUser = this.props.user

    let reviewList = null

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
    let list = []
    if (currentUser != null) {
      const reviews = (this.props.reviews[currentUser.id]) ? this.props.reviews[currentUser.id] : []
      list = reviews.map((review, i) => {
        return (
          <li key={i} className="review-block">
            <h4 className="review-header">Review/description: </h4>
            <p className="review-description">
              {review.description}
            </p>
            <h4 className="review-header">Animals spotted: </h4>
            <p className="review-animals">
              {review.animals}
            </p>
            <h4 className="review-header">Plants identified: </h4>
            <p className="review-plants">
              {review.plants}
            </p>
            <h4 className="review-header">Mushrooms and other fungi: </h4>
            <p className="review-fungi">
              {review.fungi}
            </p>
          </li>
        )
      })
    }

    return (
      <ul className="reviews">
        {list}
      </ul>
    )
  }
}

const stateToProps = (state) => {
  return {
    reviews: state.review.reviewMap,
    user: state.account.user,
  }
}

const dispatchToProps = (dispatch) => {
	return {
    fetchReviews: (params) => dispatch(actions.fetchReviews(params)),
    reviewUpdated: (review) => dispatch(actions.reviewUpdated(review)),
	}
}

export default connect(stateToProps, dispatchToProps)(UserReviews)
