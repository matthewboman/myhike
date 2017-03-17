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

  // Show/hide editing capabilities
  toggleEdit(event) {
    event.preventDefault()
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  // Update profile pieces that user changes
  updateProfile(event) {
    let updatedProfile = Object.assign({}, this.state.profile)
    let value = (!event.target.value) ? event.target.defaultValue : event.target.value
    updatedProfile[event.target.id] = value
    this.setState({
      profile: updatedProfile,
    })
  }

  submitUpdate(event) {
    event.preventDefault()
    this.setState({
      isEditing: !this.state.isEditing,
    })
    this.props.onUpdate(this.state.profile)
  }

  render() {
    let profile = this.props.profile
    let content = null

    // Display profile or editing view
    if (this.state.isEditing == true) {
      content = (
        <div>
          <input
            className="form-control"
            id="firstName"
            onChange={this.updateProfile.bind(this)}
            defaultValue={profile.firstName} />
          <br />
          <input
            className="form-control"
            id="lastName"
            onChange={this.updateProfile.bind(this)}
            defaultValue={profile.lastName} />
          <br />
          <input
            className="form-control"
            id="city"
            onChange={this.updateProfile.bind(this)}
            defaultValue={profile.city} />
          <br />
        {/*  <input
            id="email"
            className="form-control"
            onChange={this.updateProfile.bind(this)}
            defaultValue={profile.email} />
          <br /> */}
          <textarea
            className="form-control"
            id="bio"
            onChange={this.updateProfile.bind(this)}
            defaultValue={profile.bio} />
          <br />
          <button onClick={this.submitUpdate.bind(this)}>Update</button>
          <button onClick={this.toggleEdit.bind(this)}>Nevermind</button>

        </div>
      )
    } else {
      content = (
        <div>
          <h4>Name: </h4>
          <span>{profile.firstName}</span>
          <span>{profile.lastName}</span><br/>
          <h4>City: </h4>
          <span>{profile.city}</span><br/>
          <h4>Bio :</h4>
          <p>{profile.bio}</p><br />
          <button onClick={this.toggleEdit.bind(this)}>Edit</button>
        </div>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default AccountEditor
