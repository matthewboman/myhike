import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import store from '../../store/store'
import { APIManager } from '../../utils'
import { Review } from './'

class HikeReviews extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.checkForReviews()
  }

  componentDidUpdate() {
    this.checkForReviews()
  }

  checkForReviews() {
    if (this.props.hike == null)
      return
    if (this.props.reviews[this.props.hike.id] != null)
      return
    this.props.fetchReviews({hikeId: this.props.hike.id})
  }

  updateReview(review) {
    this.props.reviewUpdated(review)
  }

  renderReviews() {
    if (this.props.hike && this.props.reviews[this.props.hike.id]) {
      return this.props.reviews[this.props.hike.id].map((review, i) => {
        return (
          <Review key={i}
            onUpdate={this.updateReview.bind(this)}
            isEditable={(this.props.user) ? (this.props.user.id == review.user.id) : false}
            review={review} />
        )
      })
    }
  }

  render() {
    return (
      <div className="reviews">
        {this.renderReviews()}
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
