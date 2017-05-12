import React, { Component } from 'react'

import { Profile } from '../User'
import { Navbar } from './'

class ProfileContainer extends Component {

  render() {
    return (
      <div>
        <Profile id={this.props.params.id}/>
      </div>
    )
  }
}

export default ProfileContainer
