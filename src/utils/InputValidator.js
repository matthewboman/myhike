import React from 'react'
import Validation from 'react-validation'
import validator from 'validator'

Object.assign(Validation.rules, {
  length: {
    rule: value => value.length > 7 ,
    hint: value => <span className="form-error is-visible">Password must be at least 8 characters</span>
  },
  required: {
    rule: value => value.toString().trim(),
    hint: value => <span className="form-error is-visible">Required</span>
  },
  email: {
    rule: value => validator.isEmail(value),
    hint: value => <span className="form-error is-visible">{value} is not a valid email address</span>
  },
  password: {
    rule: (value, components) => {
      const password = components.password.state
      const passwordConfirm = components.passwordConfirm.state
      const isBothUsed = password && passwordConfirm && password.isUsed && passwordConfirm.isUsed
      const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged

      if (!isBothUsed || !isBothChanged) {
        return true
      }
      return password.value === passwordConfirm.value
    },
    hint: () => <span className="form-error is-visible">Passwords should match</span>
  },
  api: {
    hint: value => (
      <button className="form-error is-visible">
        API Error on "{value}" value.
      </button>
    )
  }
})

export default Validation
