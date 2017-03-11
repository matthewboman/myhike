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

  updateVisitor(event) {
    let updated = Object.assign({}, this.state.user)
    updated[event.target.id] = event.target.value
    this.setState({
      user: updated
    })
  }

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
        <input className="login-form" onChange={this.updateVisitor.bind(this)} type="text" id="username" placeholder="username" />
        <input className="login-form" onChange={this.updateVisitor.bind(this)} type="password" id="password" placeholder="Password" />
        <button className="btn-login" onClick={this.login.bind(this)}>Log in</button>
      </div>
    )
  }
}

export default Login
