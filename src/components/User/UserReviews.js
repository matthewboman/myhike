import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import store from '../../store/store'
import { APIManager } from '../../utils'
import { Review } from '../Reviews'

class UserReviews extends Component {
  constructor() {
    super()
    this.state = {}
  }

  updateReview(review) {
    this.props.reviewUpdated(review)
  }

  renderReviews() {
    const person = (this.props.displayIn == 'account') ? this.props.user : this.props.profile
    if (this.props.reviews[person.id]) {
      return this.props.reviews[person.id].map((review, i) => {
        return (
          <Review key={i}
            onUpdate={this.updateReview.bind(this)}
            isEditable={(this.props.user) ? (this.props.user.id == review.user.id) : false}
            review={review}
            inUser={true} />
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
