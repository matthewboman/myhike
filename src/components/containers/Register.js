import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { RegisterForm } from '../presentation/'

class Register extends Component {
  constructor() {
    super()
    this.state = {}
  }

  register(profile) {
      console.log('register profile ' + JSON.stringify(profile))
      this.props.profileCreated(profile)
      this.props.onClose()
  }

  render() {
    return (
      <div>
        <RegisterForm onRegister={this.register.bind(this)}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    // component breaks if this isn't in it
  }
}

const dispatchToProps = (dispatch) => {
  return {
    profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
  }
}

export default connect(stateToProps, dispatchToProps)(Register)
