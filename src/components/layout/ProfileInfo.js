import React, { Component } from 'react'

import { Profile } from '../containers'

class ProfileInfo extends Component {

  render() {
    return (
      <div>
        Profile Info layout
        <Profile id={this.props.params.id}/>
      </div>
    )
  }
}

export default ProfileInfo
