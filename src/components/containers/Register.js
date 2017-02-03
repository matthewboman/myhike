import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { APIManager } from '../../utils'
import { RegisterForm } from '../presentation/'

class Register extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {
    APIManager.get('/account/currentUser', null, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
      if (response.profile == null) {
        return
      }

      console.log(response.profile)
      this.props.currentUserReceived(response.profile)
    })
  }

  register(visitor) {
    console.log(JSON.stringify(visitor) + ' is trying to join the site')
    APIManager.post('/account/register', visitor, (err, response) => {
      if (err) {
        let msg = err.message || err
        console.error(msg)
        return
      }

      console.log(response.profile + 'successfully joined')
      this.props.profileCreated(response.profile)
    })
  }

  render() {
    return (
      <div className="sidebar">
        <RegisterForm onRegister={this.register.bind(this)}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    currentUser: state.account.currentUser
  }
}

const dispatchToProps = (dispatch) => {
  return {
    currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
    profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
  }
}

export default connect(stateToProps, dispatchToProps)(Register)
