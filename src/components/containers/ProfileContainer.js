import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { ImageHelper, ImageUploader } from '../../utils'
import { UserReviews } from '../User'
import { Navbar } from './'

class ProfileContainer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchReviews({'user.id': this.props.params.id})
    this.props.fetchProfile(this.props.params.id)
  }

  renderProfile() {
    const profile = this.props.profiles[this.props.params.id]
    if (profile) {
      return (
        <div className="account-image-box">
          <h3>{profile.username}</h3>
          <img className="account-image" src={ImageHelper.profile(profile.image, 300)} />
          <br />
          <div className="bio-block">
            <span className="profile-city">{profile.city}</span>
            <p className="bio" >{profile.bio}</p>
          </div>
        </div>
      )
    }
  }

  renderReviews() {
    if (this.props.profiles[this.props.params.id] && this.props.reviews) {
      return (
        <UserReviews profile={this.props.profiles[this.props.params.id]}
                     reviews={this.props.reviews}
                     displayIn={'profile'}/>
      )
    }
  }

  render() {
    return (
      <div className="row">

        <div className="col-md-4">
          {this.renderProfile()}
        </div>

        <div className="col-md-8">
          {this.renderReviews()}
        </div>

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

export default connect(stateToProps, dispatchToProps)(ProfileContainer)
