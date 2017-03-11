import React, { Component } from 'react'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      profile: {
        username: '',
        firstName: '',
        lastName: '',
        bio: '',
        city: '',
        image: '',
        email: ''
      }
    }
  }

  updateProfile(event) {
    event.preventDefault()
    let upodateProfile = Object.assign({}, this.state.profile)
    updatedProfile[event.target.id] = event.target.value
    this.setState({
      profile: updatedProfile
    })
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Profile
