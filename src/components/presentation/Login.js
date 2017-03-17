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
        <h3>Log in</h3>

        <div>
          <label>Username</label>
          <input
            className="form-control"
            onChange={this.updateVisitor.bind(this)}
            type="text" id="username"
            placeholder="username" />
        </div>
        <br />
        <div>
          <label>Password</label>
          <input
            className="form-control"
            onChange={this.updateVisitor.bind(this)}
            type="password" id="password"
            placeholder="password" />
        </div>
        <br />
        <div>
          <button
            className="btn btn-info btn-block"
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
