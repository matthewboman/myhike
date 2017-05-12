import React, { Component } from 'react'

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

  // Set state with what user types into inputs
  updateVisitor(event) {
    let updated = Object.assign({}, this.state.user)
    updated[event.target.id] = event.target.value
    this.setState({
      user: updated
    })
  }

  // Log user in
  login(event) {
    event.preventDefault()
    if (this.state.user.username == 0) {
      console.log('Please enter your username')
      return
    }
    if (this.state.user.password.length == 0) {
      console.log('Please enter your password')
      return
    }
    this.props.onLogin(this.state.user)
  }

  render() {
    return (
      <div>
      <form>
        <div className="login">
          <input
            className="form-control login-field"
            onChange={this.updateVisitor.bind(this)}
            type="text" id="username"
            placeholder="username" />
        </div>
        <br />
        <div>
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
