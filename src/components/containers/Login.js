import React, { Component } from 'react'

import { APIManager } from '../../utils'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      visitor: {
        username: '',
        password: ''
      }
    }
  }

  updateVisitor(event) {
    let updated = Object.assign({}, this.state.visitor)
    updated[event.target.id] = event.target.value
    this.setState({
      visitor: updated
    })
  }

  login(event) {
    event.preventDefault()
    console.log(this.state.visitor + ' allegedly logged in')
    this.props.onLogin(this.state.visitor)
  }

  render() {
    return (
      <div>
        <input onChange={this.updateVisitor.bind(this)} type="text" id="username" placeholder="username" />
        <input onChange={this.updateVisitor.bind(this)} type="password" id="password" placeholder="Password" />
        <button onClick={this.login.bind(this)}>Log in</button>
      </div>
    )
  }
}

export default Login
