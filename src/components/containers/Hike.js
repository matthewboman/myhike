import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import actions from '../../actions'
import { APIManager } from '../../utils'
import HikeReviews from './HikeReviews'
import { CreateReview } from '../presentation'

class Hike extends Component {
  constructor() {
    super()
    this.state = {
      addReview: false
    }
  }

  // Show/hide CreateReview component
  displayCreateReviewComponent(event) {
    this.setState({
      addReview: !this.state.addReview
    })
  }

  submitReview(review) {
    if (this.props.user == null) {
      console.log('You must be logged in to post a review')
      return
    }
    console.log(JSON.stringify(review))
    this.props.reviewCreated(review, this.props.hike)
    this.setState({
      addReview: !this.state.addReview
    })
  }

  componentDidUpdate() {
    let hike = this.props.hike
    if (hike == null) {
      return
    }
  }

  render() {
    const hike = this.props.hike
    const user = this.props.user

    //Make sure we have the hike info before rendering
    if (hike == null ) {return false}
    const header = (
      <div>
        <h3>{hike.name}</h3>
      </div>
    )

    //Show/hide CreateReview component
    let newReview

    if (this.state.addReview == true) {
      newReview = (
        <div>
        <CreateReview
          user={user}
          hike={this.props.hike}
          onReview={this.submitReview.bind(this)} />
        </div>
      )
    } else {
      newReview = (
        <div>
          <button className="btn" onClick={this.displayCreateReviewComponent.bind(this)}>Add a Review</button>
        </div>
      )
    }

    return (
      <div className="sidebar">
        {header}
        <HikeReviews />
        {newReview}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    hike: state.hike.currentHike,
    user: state.account.user,
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchHike: (params) => dispatch(actions.fetchHike(params)),
    reviewCreated: (review, params) => dispatch(actions.reviewCreated(review, params))
  }
}

export default connect(stateToProps, dispatchToProps)(Hike)
