import React, { Component } from 'react'
import Validation from 'react-validation'
import validator from 'validator'

/*
TODO: move validation rules to utils
TODO: get API error (username/email taken) from action.index
      by creating 'error state' in account reducer
*/

// ================ Validation =========================
Object.assign(Validation.rules, {
  // Field must have 8+ characters
  length: {
    rule: value => {
      return value.length >7;
    },
    hint: value => {
      return <span className="form-error is-visible">Password must be at least 8 characters</span>
    }
  },
  // Field is required
  required: {
    // Make sure what we get is strings
    rule: value => {
      return value.toString().trim();
    },
    hint: value => {
      return <span className="form-error is-visible">Required</span>
    }
  },
  // Make sure email field is email
  email: {
    rule: value => {
      return validator.isEmail(value);
    },
    hint: value => {
      return <span className="form-error is-visible">{value} is not a valid email address</span>
    }
  },
  // Compare two password fields
  password: {
    rule: (value, components) => {
      const password = components.password.state;
      const passwordConfirm = components.passwordConfirm.state;
      const isBothUsed = password && passwordConfirm && password.isUsed && passwordConfirm.isUsed;
      const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

      if (!isBothUsed || !isBothChanged) {
        return true;
      }

      return password.value === passwordConfirm.value;
    },
    hint: () => <span className="form-error is-visible">Passwords should match</span>
  },
  // Define API rule to show hint after API error response
  api: {
    // no rule needed b/c it will bubble up from DB
    hint: value => (
      <button className="form-error is-visible">
        API Error on "{value}" value. Focus to hide.
      </button>
    )
  }
})
// =================== END Validation ======================

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

  // Register user if all checks out
  register(event) {
    event.preventDefault()
    this.props.onRegister(this.state.visitor)
  }

  render () {
    return (
      <Validation.components.Form>
      <h3>Sign up</h3>

        <div>
          <label>Username</label>
          <Validation.components.Input
            onChange={this.updateVisitor.bind(this)}
            value=""
            className="form-control"
            name="username" id="username"
            validations={["required"]} />
        </div>
        <br />
        <div>
          <label>Email</label>
          <Validation.components.Input
            onChange={this.updateVisitor.bind(this)}
            value=""
            className="form-control"
            name="email" id="email"
            validations={["required", "email"]} />
        </div>
        <br />
        <div>
          <label>Password</label>
          <Validation.components.Input
            onChange={this.updateVisitor.bind(this)}
            type="password"
            value=""
            className="form-control"
            name="password" id="password"
            validations={["length", "required", "password"]} />
        </div>
        <br />
        <div>
          <label>Confirm Password</label>
          <Validation.components.Input
            onChange={this.updateVisitor.bind(this)}
            type="password"
            value=""
            className="form-control"
            name="passwordConfirm" id="passwordConfirm"
            validations={["length", "required", "password"]} />
        </div>
        <br />
        <div>
          <Validation.components.Button
            onClick={this.register.bind(this)}
            className="btn btn-info btn-block" >
            Join now!
          </Validation.components.Button>
        </div>
      </Validation.components.Form>
    )
  }
}

export default RegisterForm
