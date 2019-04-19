import React, { Component } from 'react'
import { Validation } from '../../utils'

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
    this.setState({ visitor: updated })
  }

  register(event) {
    event.preventDefault()
    this.props.onRegister(this.state.visitor)
  }

  render () {
    return (
      <Validation.components.Form>
        <div>
          <span>Username</span>
          <Validation.components.Input
            onChange={this.updateVisitor.bind(this)}
            value="username"
            className="form-control register-field"
            name="username" id="username"
            validations={["required"]} />
        </div>
        <br />
        <div>
          <span>Email</span>
          <Validation.components.Input
            onChange={this.updateVisitor.bind(this)}
            value="email"
            className="form-control register-field"
            name="email" id="email"
            validations={["required", "email"]} />
        </div>
        <br />
        <div>
          <span>Password</span>
          <Validation.components.Input
            onChange={this.updateVisitor.bind(this)}
            type="password"
            value="password"
            className="form-control register-field"
            name="password" id="password"
            validations={["length", "required", "password"]} />
        </div>
        <br />
        <div>
          <span> Re-type password</span>
          <Validation.components.Input
            onChange={this.updateVisitor.bind(this)}
            type="password"
            value="password"
            className="form-control register-field"
            name="passwordConfirm" id="passwordConfirm"
            validations={["length", "required", "password"]} />
        </div>
        <br />
        <div>
          <Validation.components.Button
            onClick={this.register.bind(this)}
            className="btn btn-block btn-register" >
            Join now!
          </Validation.components.Button>
        </div>
      </Validation.components.Form>
    )
  }
}

export default RegisterForm
