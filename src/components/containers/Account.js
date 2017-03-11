import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { APIManager } from '../../utils'
import actions from '../../actions'
import { Login } from '../presentation'

class Account extends Component {
  constructor() {
    super()
    this.state = {}
  }


  login(credentials) {
    this.props.currentUserReceived(credentials)
  }

  logout(event) {
    event.preventDefault()
    this.props.logoutUser(null)
  }


  render() {
    /*
      Display login/signup if user is not logged in.
      If user is logged in, display profile link and logout.
    */
    let content = null
    
    if (this.props.user == null) {
      content = (
        <div>
          <Login onLogin={this.login.bind(this)} />
          <Link to="/register"><button>Register</button></Link>
        </div>
      )
    } else {
      content = (
        <div>
          <Link to="/currentuser"><button>Account</button></Link>
          <button onClick={this.logout.bind(this)}>Log out {this.props.user.username}</button>
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

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    currentUserReceived: (user) => dispatch(actions.currentUserReceived(user)),
    logoutUser: (user) => dispatch(actions.logoutUser(user)),
  }
}

export default connect(stateToProps, dispatchToProps)(Account)
