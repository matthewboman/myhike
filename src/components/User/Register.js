import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { RegisterForm } from './'
import { Error } from '../common'

class Register extends Component {
  constructor() {
    super()
    this.state = {}
  }

  register(profile) {
    this.props.profileCreated(profile)
    if (this.props.error == null)
      this.props.onClose()
  }

  render() {
    return (
      <div className="register">
        {(this.props.error) ? <Error /> : ''}
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
