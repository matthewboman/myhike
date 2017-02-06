import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      visitor: {
        username: '',
        email: '',
        password: ''
      }
    }
  }

  updateVisitor(event) {
    let updated = Object.assign({}, this.state.visitor)
    updated[event.target.id] = event.target.value
    console.log(updated)
    this.setState({
      visitor: updated
    })
  }

  register(event) {
    event.preventDefault()
    this.props.onRegister(this.state.visitor)
    browserHistory.push(`/`)
  }

  render() {
    return (
      <div>
				<h2>Sign Up</h2>
				<input onChange={this.updateVisitor.bind(this)} className="form-control" type="text" id="username" placeholder="username" /><br />
				<input onChange={this.updateVisitor.bind(this)} className="form-control" type="text" id="email" placeholder="Email" /><br />
				<input onChange={this.updateVisitor.bind(this)} className="form-control" type="password" id="password" placeholder="Password" /><br />
				<button onClick={this.register.bind(this)} className="btn btn-info btn-block">Join</button>
			</div>
    )
  }
}

export default RegisterForm
