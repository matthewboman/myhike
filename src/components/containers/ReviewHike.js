import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { CreateReview } from '../presentation'

/*
  TODO: Hike can be submitted only if user is logged in and location is selected
*/

class CreateHike extends Component {
  constructor() {
    super()
    this.checkForReviews = this.checkForReviews.bind(this)
    this.state = {}
  }

  checkForReviews() {
    let hike = this.props.currentHike
    if (hike == null) {
      return
    }

    let reviewsArray = this.props.reviews[hike.id]
    if (reviewsArray != null) {
      console.log(reviewsArray)
      return
    }
    this.props.fetchReviews({hikeId: hike.id})
  }

  componentDidUpdate() {
    console.log("location " + JSON.stringify(this.props.location))
    console.log(" hike ID " + this.props.currentHike._id)
  }

  submitReview(review) {
    console.log('submitting ' + JSON.stringify(review))
    // APIManager.post('/api/hike', this.state.hike, (err, response) => {
    //   if (err) {
    //     console.error('ERROR: ' + err.message)
    //   }
    // })
  }



  render() {

    if (this.props.currentUser == null || undefined) { return false }

    return (
      <div className="sidebar">
        <CreateReview
          user={this.props.currentUser.username}
          onReview={this.submitReview.bind(this)}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    location: state.hike.hikeLocation,
    currentHike: state.hike.currentHike,
    currentUser: state.account.currentUser,
    reviews: state.review.reviewMap
  }
}

const dispatchToProps = (dispatch) => {
	return {
    fetchReviews: (params) => dispatch(actions.fetchReviews(params)),
		locationAdded: (location) => dispatch(actions.locationAdded(location)),
	}
}

export default connect(stateToProps, dispatchToProps)(CreateHike)
