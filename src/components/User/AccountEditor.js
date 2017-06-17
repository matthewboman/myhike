import React, { Component } from 'react'

/*
TODO: build "upate email" capabilities that generates token,
      stores in DB w/ new email, mails link to user, validates,
      and updated.

      mailchimp?, nodemailer?
*/

class AccountEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      profile: props.profile,
    }
  }

  toggleEdit(event) {
    event.preventDefault()
    this.setState({ isEditing: !this.state.isEditing })
  }


  updateProfile(event) {
    let updatedProfile = Object.assign({}, this.state.profile)
    let value = (!event.target.value) ? event.target.defaultValue : event.target.value
    updatedProfile[event.target.id] = value
    this.setState({ profile: updatedProfile })
  }

  submitUpdate(event) {
    event.preventDefault()
    this.setState({ isEditing: !this.state.isEditing })
    this.props.onUpdate(this.state.profile)
  }

  renderProfile() {
    return (
      <div className="profile-block">
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
        <br />
        <button className="button-default" onClick={this.toggleEdit.bind(this)}>Edit</button>
      </div>
    )
  }

  renderEditingProfile() {
    return (
      <div className="edit-profile-block">
        <span className="edit-label edit-firstname">First name:</span>
        <input
          className="form-control"
          id="firstName"
          onChange={this.updateProfile.bind(this)}
          defaultValue={this.props.profile.firstName} />
        <br />
        <span className="edit-label edit-lastname">Last name:</span>
        <input
          className="form-control"
          id="lastName"
          onChange={this.updateProfile.bind(this)}
          defaultValue={this.props.profile.lastName} />
        <br />
        <span className="edit-label edit-city">City:</span>
        <input
          className="form-control"
          id="city"
          onChange={this.updateProfile.bind(this)}
          defaultValue={this.props.profile.city} />
        <br />
      {/*  <input
          id="email"
          className="form-control"
          onChange={this.updateProfile.bind(this)}
          defaultValue={profile.email} />
        <br /> */}
        <span className="edit-label edit-bio">Bio:</span>
        <textarea
          className="form-control edit-bio"
          id="bio"
          rows="8"
          onChange={this.updateProfile.bind(this)}
          defaultValue={this.props.profile.bio} />
        <br />
        <button className="button-default" onClick={this.submitUpdate.bind(this)}>Update</button>
        <button className="button-default" onClick={this.toggleEdit.bind(this)}>Nevermind</button>
      </div>
    )
  }

  render() {
    return (
      <div className="account-editor">
        { (this.state.isEditing == false) ? this.renderProfile() : this.renderEditingProfile() }
      </div>
    )
  }
}

export default AccountEditor
