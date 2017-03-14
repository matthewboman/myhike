import React, { Component } from 'react'

import { Profile } from '../containers'
import { Navbar } from './'

class ProfileInfo extends Component {

  render() {
    return (
      <div>
        <Profile id={this.props.params.id}/>
      </div>
    )
  }
}

export default ProfileInfo
