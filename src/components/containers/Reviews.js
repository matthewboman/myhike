import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import store from '../../store/store'
import { APIManager } from '../../utils'
import { CreateReview, Review } from '../presentation'

/*
  TODO: Hike can be submitted only if user is logged in and location is selected
*/

class Reviews extends Component {
  constructor() {
    super()
    this.checkForReviews = this.checkForReviews.bind(this)
    this.state = {
      addReview: false
    }
  }

  // Get hike and reviews up and loaded before component renders
  checkForReviews() {
    let hike = this.props.currentHike
    if (hike == null) {
      return
    }
    let reviewsArray = this.props.reviews[hike.id]
    if (reviewsArray != null) {
      return
    }
    this.props.fetchReviews({hikeId: hike.id})
  }

  // Show/hide CreateReview component
  displayCreateReviewComponent(event) {
    this.setState({
      addReview: !this.state.addReview
    })
  }

  // Add new hike review to DB
  submitReview(review) {
    // check if user is logged in
    // if (this.props.user == null) {
    //   alert('You must be signed up')
    //   return
    // }
    let updatedReview = Object.assign({}, review)
    let hikeId = this.props.currentHike.id
    updatedReview['hikeId'] = hikeId
    this.setState({
      addReview: !this.state.addReview
    })

    this.props.reviewCreated(updatedReview, hikeId)
  }

  componentDidMount() {
    this.checkForReviews()
  }

  componentDidUpdate() {
    this.checkForReviews()
  }

  render() {
    /*
    Show/hide CreateReview component
    */
    let newReview

    if (this.state.addReview == true) {
      newReview = (
        <div>
          <CreateReview onReview={this.submitReview.bind(this)} />
        </div>
      )
    } else {
      newReview = (
        <div>
          <button onClick={this.displayCreateReviewComponent.bind(this)}>Add a Review</button>
        </div>
      )
    }

    /*
    Make sure component has what it needs to display reviews
    */
    const currentHike = this.props.currentHike
    let hikeName = null
    let reviewList = null

    if (currentHike != null) {
      let hikeReviews = this.props.reviews[currentHike.id]

      if (hikeReviews != null) {
        reviewList = hikeReviews.map((review, i) => {
          return (
            <li key={i}>
              <Review currentReview={review} />
            </li>
          )
        })
      }
    }

    return (
      <div className="sidebar">
        {newReview}
        <br />
        <ul className="reviews">
          {reviewList}
        </ul>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    currentHike: state.hike.currentHike,
    reviews: state.review.reviewMap
  }
}

const dispatchToProps = (dispatch) => {
	return {
    fetchReviews: (params) => dispatch(actions.fetchReviews(params)),
    reviewCreated: (review, hikeId) => dispatch(actions.reviewCreated(review, hikeId)),
	}
}

export default connect(stateToProps, dispatchToProps)(Reviews)
