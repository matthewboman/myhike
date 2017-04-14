import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import actions from '../../actions'
import { ImageHelper, ImageUploader } from '../../utils'
import { AccountEditor } from '../presentation'
import { Navbar } from '../layout'
import UserReviews from './UserReviews'


class Account extends Component {
  constructor() {
    super()
    this.state = {
      updated: {
        image: ''
      },
      updateImage: false,
      showNevermind: false
    }
  }

  // componentDidMount() {
  //   this.getCurrentUserReviews(user)
  // }

  // Show/hide editing capabilities
  toggleImageUploader() {
    this.setState({
      updateImage: !this.state.updateImage
    })
  }

  uploadImage(files) {
    const image = files[0]
    ImageUploader.upload(image, (results) => {
      let updatedProfile = Object.assign({}, this.props.user)
      updatedProfile['image'] = results.secure_url
      this.setState({
        updated: updatedProfile,
        showNevermind: true
      })
    })
  }

  updatePhoto(event) {
    if (this.state.updated.image == '') {
      this.setState({ updateImage: false})
      return
    }
    this.props.profileUpdated(this.props.user, this.state.updated)
    this.setState({ updateImage: false})
  }

  submitUpdate(profile) {
    this.props.profileUpdated(this.props.user, profile)
  }

  render() {
    const profile = this.props.user

    // displaying and updating image
    const image = (profile.image == null) ? '' : ImageHelper.profile(profile.image, 300)
    const newImage = (this.state.updated.image == '') ? '' : ImageHelper.preview(this.state.updated.image, 325, 300)

    let updateImage

    if (this.state.updateImage == true) {
      updateImage = (
        <div className="update-profile-image">
          <Dropzone onDrop={this.uploadImage.bind(this)} />
          <br />
          <img className="image-preview" src={newImage} />
          <br />
          <button className="btn" onClick={this.updatePhoto.bind(this)}>Update</button>
          <span>  </span>
          <button className="btn" onClick={this.toggleImageUploader.bind(this)}>Nevermind</button>
        </div>
      )
    } else {
      updateImage = (
        <div>
          <button className="btn change" onClick={this.toggleImageUploader.bind(this)}>Change profile picture</button>
        </div>
      )
    }

    // displaying user's hike reviews



    return (
      <div className="container-fluid">
        <h2>Welcome {profile.username}</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="account-image-box">
              <img className="account-image" src={image} />
              <br />
              {updateImage}
            </div>
          </div>

          <div className="col-md-6">
            <div className="bio-block">
              <AccountEditor
                profile={profile}
                onUpdate={this.submitUpdate.bind(this)} />
            </div>
          </div>

        </div>
        <br />
        <div className="row">
          <UserReviews />
        </div>

      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user,
    reviews: state.review.reviewMap
  }
}

const dispatchToProps = (dispatch) => {
  return {
    // getCurrentUserReviews: (user) => dispath(actions.getCurrentUserReviews(user)),
    profileUpdated: (user, profile) => dispatch(actions.profileUpdated(user, profile))
  }
}

export default connect(stateToProps, dispatchToProps)(Account)
