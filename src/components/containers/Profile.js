import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { ImageHelper } from '../../utils'


class Profile extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const profile = this.props.profiles[this.props.id]

    if (profile == null) {
      this.props.fetchProfile(this.props.id)
      return
    }
    if (this.props.reviews[profile.id] != null) {
      return
    }
    this.props.fetchReviews({'user.id': profile.id})
  }

  componentDidUpdate() {
    const profile = this.props.profiles[this.props.id]
    if (profile == null) {
      return
    }
    if (this.props.reviews[profile.id] != null) {
      return
    }
    this.props.fetchReviews({'user.id': profile.id})
  }

  render() {
    let profile = this.props.profiles[this.props.id]
    let header = null

    if (profile != null) {
      const reviews = (this.props.reviews[profile.id]) ? this.props.reviews[profile.id] : []
      const list = reviews.map((review, i) => {
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
      header = (
        <div>
          <img src={ImageHelper.thumbnail(profile.image, 200)} />
          <br />
          <h3>{profile.username}</h3>
          <p>city: {profile.city}</p>
          <h3>Reviews</h3>
          <ul  className="reviews">
            {list}
          </ul>
        </div>
      )
    }

    return (
      <div>
        {header}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    reviews: state.review.reviewMap,
    profiles: state.profile.profileMap,
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchReviews: (params) => dispatch(actions.fetchReviews(params)),
    fetchProfile: (id) => dispatch(actions.fetchProfile(id)),
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)
