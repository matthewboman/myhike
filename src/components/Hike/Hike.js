import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { CreateReview, HikeReviews } from '../Reviews'

class Hike extends Component {
  constructor() {
    super()
    this.state = {
      addReview: false
    }
  }

  componentDidUpdate() {
    if (this.props.hike == null)
      return
  }

  displayCreateReviewComponent(event) {
    if (!this.props.user) {
      this.props.displayMessage('You must be logged in to add a review')
      return
    }
    this.setState({ addReview: !this.state.addReview })
  }

  submitReview(review) {
    this.props.reviewCreated(review, this.props.hike)
    this.setState({ addReview: !this.state.addReview })
  }

  renderHikeName() {
    if (!this.props.hike)
      return null
    return (
      <div className="hike-name">{this.props.hike.name}</div>
    )
  }

  renderCreateReviewOption() {
    if (this.state.addReview == true) {
      return (
        <CreateReview
          user={this.props.user}
          hike={this.props.hike}
          onReview={this.submitReview.bind(this)} />
      )
    } else {
      return (
        <div className="review-block">
          <span className="add-review" onClick={this.displayCreateReviewComponent.bind(this)}>
            Add a Review
          </span>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="hike-component-container">
        {this.renderHikeName()}
        <span className="error">{this.props.message}</span>
        {this.renderCreateReviewOption()}
        <HikeReviews />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    hike: state.hike.currentHike,
    message: state.message.message,
    user: state.account.user,
  }
}

const dispatchToProps = (dispatch) => {
  return {
    displayMessage: (message) => dispatch(actions.displayMessage(message)),
    fetchHike: (params) => dispatch(actions.fetchHike(params)),
    reviewCreated: (review, params) => dispatch(actions.reviewCreated(review, params))
  }
}

export default connect(stateToProps, dispatchToProps)(Hike)
