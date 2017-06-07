import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { RegisterForm } from './'

class Register extends Component {
  constructor() {
    super()
    this.state = {}
  }

  register(profile) {
    this.props.profileCreated(profile)
    this.props.onClose()
  }

  render() {
    return (
      <div className="register">
        {(this.props.error) ? this.props.error : ''}
        <RegisterForm onRegister={this.register.bind(this)}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    error: state.message.error
  }
}

const dispatchToProps = (dispatch) => {
  return {
    profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
  }
}

export default connect(stateToProps, dispatchToProps)(Register)
