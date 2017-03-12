import React, { Component } from 'react'

/*
  TODO: allow error handling to bubble up from database
*/

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

  // Update state with what user enters into input
  updateVisitor(event) {
    let updated = Object.assign({}, this.state.visitor)
    updated[event.target.id] = event.target.value
    this.setState({
      visitor: updated
    })
  }

  // REgister user if all checks out
  register(event) {
    event.preventDefault()
    if (this.state.visitor.username == 0) {
      console.log('Please enter a username')
      return
    }
    if (this.state.visitor.email.length == 0) {
      console.log('Please enter an email')
      return
    }
    if (this.state.visitor.password.length == 0) {
      console.log('Please enter a password')
      return
    }
    this.props.onRegister(this.state.visitor)
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
