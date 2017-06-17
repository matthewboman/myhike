import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import actions from '../../actions'
import { ImageHelper, ImageUploader } from '../../utils'
import { AccountEditor, UserReviews } from '../User'
import { Navbar } from './'


class AccountContainer extends Component {
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

  componentDidMount() {
    this.props.fetchReviews({'user.id': this.props.user.id})
  }

  toggleImageUploader() {
    this.setState({ updateImage: !this.state.updateImage })
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

  updateImage() {
    if (this.state.updateImage == true) {
      return (
        <div className="update-profile-image">
          <Dropzone onDrop={this.uploadImage.bind(this)} />
          <br />
          <img className="image-preview"
               src={(this.state.updated.image == '') ? '' : ImageHelper.preview(this.state.updated.image, 325, 300)} />
          <br />
          <button className="button-default" onClick={this.updatePhoto.bind(this)}>Update</button>
          <span>  </span>
          <button className="button-default" onClick={this.toggleImageUploader.bind(this)}>Nevermind</button>
        </div>
      )
    } else {
      return (
        <div className="change-button">
          <button className="button-default" onClick={this.toggleImageUploader.bind(this)}>Change profile picture</button>
        </div>
      )
    }
  }

  renderProfile() {
    const image = (this.props.user.image == null) ? '' : ImageHelper.profile(this.props.user.image, 300)
    return (
      <div className="account-image-box">
        <img className="account-image" src={image} />
        <br />
        {this.updateImage()}

        <div className="bio-block">
          <AccountEditor
            profile={this.props.user}
            onUpdate={this.submitUpdate.bind(this)} />
        </div>

      </div>
    )
  }

  render() {
    return (
      <div className="account-container">
        <div className="account-header">Welcome {this.props.user.username}</div>
        <div className="row">

          <div className="col-md-4">
            {this.renderProfile()}
          </div>

          <div className="col-md-8">
            <UserReviews user={this.props.user}
                         reviews={this.props.reviews}
                         displayIn={'account'} />
          </div>

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
    fetchReviews: (params) => dispatch(actions.fetchReviews(params)),
    getCurrentUserReviews: (user) => dispatch(actions.getCurrentUserReviews(user)),
    profileUpdated: (user, profile) => dispatch(actions.profileUpdated(user, profile))
  }
}

export default connect(stateToProps, dispatchToProps)(AccountContainer)
