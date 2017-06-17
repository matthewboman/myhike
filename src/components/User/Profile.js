import React, { Component } from 'react'
import { ImageHelper } from '../../utils'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const image = (this.props.profile.image == null) ? '' : ImageHelper.profile(this.props.profile.image, 300)

    return (
      <div className="profile-block">
        <img className="account-image" src={image} />
        <div className="profile-name-block">
          <div className="profile-title profile-name-title">Name: </div>
          <span className="profile-name">{this.props.profile.firstName}</span>
          <span> </span>
          <span className="profile-name">{this.props.profile.lastName}</span>
        </div>
        <br/>
        <div className="profile-city-block">
          <div className="profile-title profile-city-title">City: </div>
          <span className="profile-city">{this.props.profile.city}</span>
        </div>
        <br/>
        <div className="profile-bio-block">
          <div className="profile-title">Bio :</div>
          <p className="profile-bio">{this.props.profile.bio}</p>
        </div>
      </div>
    )
  }
}

export default Profile
