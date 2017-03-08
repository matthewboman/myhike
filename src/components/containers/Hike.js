import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { Review } from '../presentation'

/*
  TODO: Allow users to edit their own hike.
  TODO: Allow users to post their own review of hike (new component similar to CreateHike)
*/

class Hike extends Component {
  constructor() {
    super()
    this.state = {
      addReview: false
    }
  }

  componentDidUpdate() {
    let hike = this.props.hike
    if (hike == null) {
      return
    }
    // prevents infinite loop, but also prevents live reload when user submits new review
    let reviewsArray = this.props.reviewsMap[hike.id]
    if (reviewsArray != null) {
      return
    }
    this.props.fetchReviews(hike)
  }

  displayReviewComponent(event) {
    this.setState({
      addReview: true
    })
  }

  submitReview(review) {
    // check if user is logged in
    // if (this.props.user == null) {
    //   alert('You must be signed up')
    //   return
    // }
    let updatedReview = Object.assign({}, review)
    let hikeId = this.props.hike.id
    updatedReview['hikeId'] = hikeId

    this.props.reviewAdded(updatedReview, hikeId)
  }

  render() {

    let hike = this.props.hike
    let reviews = this.props.reviewsMap
    let reviewList
    let header
    let newReview

    if (hike != null) {
      header = (
        <div>
          <h3>{hike.name}</h3>
        </div>
      )
    }

    if (reviews != null && hike != null) {
      let hikeReviews = reviews[hike.id]
      if (hikeReviews != null) {
        reviewList = hikeReviews.map((review, i) => {
          return (
            <li className="review-block" key={i}>
              <p className="review-description">{review.description}</p>
              <p className="review-animals">{review.animals}</p>
              <p className="review-plants">{review.plants}</p>
              <p className="review-fungi">{review.fungi}</p>
            </li>
          )
        })
      }
    }

    if (this.state.addReview == true) {
      newReview = (
        <div>
          <Review onReview={this.submitReview.bind(this)} />
        </div>
      )
    } else {
      newReview = (
        <div>
          <button onClick={this.displayReviewComponent.bind(this)}>Add a Review</button>
        </div>
      )
    }

    return (
      <div className="sidebar">
      {header}
      <ul className="reviews">
        {reviewList}
      </ul>
      {newReview}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    hike: state.hike.currentHike,
    reviewsMap: state.hike.reviewMap
    // reviewsMap: state.
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchHike: (params) => dispatch(actions.fetchHike(params)),
    fetchReviews: (hike) => dispatch(actions.fetchReviews(hike)),
    reviewAdded: (review) => dispatch(actions.reviewAdded(review)),
  }
}

export default connect(stateToProps, dispatchToProps)(Hike)
