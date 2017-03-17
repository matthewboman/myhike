import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'

import actions from '../../actions'
import { APIManager, ImageHelper, ImageUploader } from '../../utils'
import { AccountEditor } from '../presentation'
import { Navbar } from '../layout'

/*
  TODO: move API logic to ImageUploader
  TODO: multiple photo capabilities
*/

class Account extends Component {
  constructor() {
    super()
    this.state = {
      updated: {
        image: ''
      },
      updateImage: false,
      buttonText: "Nevermind"
    }
  }

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
        buttonText: "Update Profile Picture"
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
    const image = (profile.image == null) ? '' : ImageHelper.profile(profile.image, 400, 360)
    const newImage = (this.state.updated.image == '') ? '' : ImageHelper.preview(this.state.updated.image, 325, 300)

    let updateImage

    if (this.state.updateImage == true) {
      updateImage = (
        <div>
          <Dropzone onDrop={this.uploadImage.bind(this)} />
          <br />
          <img src={newImage} />
          <br />
          <button onClick={this.updatePhoto.bind(this)}>{this.state.buttonText}</button>
        </div>
      )
    } else {
      updateImage = (
        <div>
          <button onClick={this.toggleImageUploader.bind(this)}>Update Profile picture</button>
        </div>
      )
    }

    return (
      <div className="container">
        <h2>Welcome {profile.username}</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="account-image">
              <img src={image} />
            </div>
            <br />
            {updateImage}
          </div>
          <div className="col-md-6">
            <div className="account-info">
              <AccountEditor
                profile={profile}
                onUpdate={this.submitUpdate.bind(this)} />
            </div>
          </div>
        </div>

        <div className="row">

        </div>

      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    profileUpdated: (user, profile) => dispatch(actions.profileUpdated(user, profile))
  }
}

export default connect(stateToProps, dispatchToProps)(Account)
