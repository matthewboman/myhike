import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import store from '../../store/store'
import { APIManager } from '../../utils'
import { Review } from './'

class HikeReviews extends Component {
  constructor() {
    super()
    this.checkForReviews = this.checkForReviews.bind(this)
    this.state = {}
  }

  // Get hike and reviews up and loaded before component renders
  checkForReviews() {
    let hike = this.props.hike
    if (hike == null) {
      return
    }
    let reviewsArray = this.props.reviews[hike.id]
    if (reviewsArray != null) {
      return
    }
    this.props.fetchReviews({hikeId: hike.id})
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
    const hike = this.props.hike
    const currentUser = this.props.user
    let reviewList = null

    if (hike != null) {
      let hikeReviews = this.props.reviews[hike.id]

      if (hikeReviews != null) {
        reviewList = hikeReviews.map((review, i) => {
          let editable = false
          if (currentUser != null) {
            editable = (currentUser.id == review.user.id)
          }
          return (
            <li key={i}>
              <Review
                onUpdate={this.updateReview.bind(this)}
                isEditable={editable}
                review={review} />
            </li>
          )
        })
      }
    }

    return (
      <div>
        <ul className="reviews">
          {reviewList}
        </ul>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    hike: state.hike.currentHike,
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

export default connect(stateToProps, dispatchToProps)(HikeReviews)
