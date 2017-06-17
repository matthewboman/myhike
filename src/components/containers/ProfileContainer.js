import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { ImageHelper, ImageUploader } from '../../utils'
import { Profile, UserReviews } from '../User'
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
    if (this.props.profiles[this.props.params.id]) {
      return (
        <div className="account-image-box">
          <Profile profile={this.props.profiles[this.props.params.id]}/>
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
      <div className="profile-container">
        <div className="row">

          <div className="col-md-4">
            {this.renderProfile()}
          </div>

          <div className="col-md-8">
            {this.renderReviews()}
          </div>

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
