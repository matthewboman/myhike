import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'

import actions from '../../actions'
import { APIManager, ImageHelper, ImageUploader } from '../../utils'
import { AccountEditor } from '../presentation'

/*
  TODO: move API logic to ImageUploader
  TODO: multiple photo capabilities
*/

class Account extends Component {
  constructor() {
    super()
    this.state = {
      updated: {}
    }
  }

  uploadImage(files) {
    // Select first image
    const image = files[0]
    // Prep Coudinary
    const cloudName = 'dotkbdwdw'
    const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
    // Prep PARAMS
    const upload_preset = 'me0nxa6b'
    const API_Secret = 'i3ngvXSllacuFCrG_SCVwbfa1WI'
    let timestamp = Date.now() / 1000 // they want seconds, not miliseconds
    const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + upload_preset + API_Secret
    const signature = sha1(paramsStr)

    const params = {
      'api_key': '614624198613471',
      'timestamp':  timestamp,
      'upload_preset': upload_preset,
      'signature': signature
    }
    // Upload image to Cloudinary
    APIManager.upload(url, image, params, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
      let updatedProfile = Object.assign({}, this.props.user)
      updatedProfile['image'] = response.body['secure_url']
      this.setState({
        updated: updatedProfile
      })
    })
  }

  updatePhoto(event) {
    this.props.profileUpdated(this.props.user, this.state.updated)
  }

  submitUpdate(profile) {
    console.log('just updated ' + JSON.stringify(profile))
    this.props.profileUpdated(this.props.user, profile)
  }

  render() {
    const profile = this.props.user
    const image = (profile.image == null) ? '' : ImageHelper.thumbnail(profile.image, 250)

    return (
      <div>
        <h2>Welcome {profile.username}</h2>
        <img src={image} />
        <br />
        <Dropzone onDrop={this.uploadImage.bind(this)} />
        <button onClick={this.updatePhoto.bind(this)}>Update Photo</button>
        <br />
        <AccountEditor
          profile={profile}
          onUpdate={this.submitUpdate.bind(this)} />
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
