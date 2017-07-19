import React, { Component } from 'react'

import { Error } from '../common'
import { APIManager } from '../../utils'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        username: '',
        password: ''
      }
    }
  }

  updateVisitor(event) {
    let updated = Object.assign({}, this.state.user)
    updated[event.target.id] = event.target.value
    this.setState({ user: updated })
  }

  login(event) {
    event.preventDefault()
    if (this.state.user.username == 0) {
      this.props.displayError('Please enter your username')
      return
    }
    if (this.state.user.password.length == 0) {
      this.props.displayError('Please enter your password')
      return
    }
    this.props.onLogin(this.state.user)
  }

  render() {
    return (
      <div className="login">
        {(this.props.error) ? <Error /> : ''}
      <form>
        <div className="username">
          <input
            className="form-control login-field"
            onChange={this.updateVisitor.bind(this)}
            type="text" id="username"
            placeholder="username" />
        </div>
        <br />
        <div className="password">
          <input
            className="form-control login-field"
            onChange={this.updateVisitor.bind(this)}
            type="password" id="password"
            placeholder="password" />
        </div>
        <br />
        <div>
          <button
            className="btn btn-block btn-login login-field"
            onClick={this.login.bind(this)}>
            Log in
          </button>
        </div>

        </form>
      </div>
    )
  }
}

export default Login
