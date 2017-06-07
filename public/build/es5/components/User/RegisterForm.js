"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Validation = _interopRequire(require("react-validation"));

var validator = _interopRequire(require("validator"));

/*
TODO: move validation rules to utils
*/

// ================ Validation =========================
Object.assign(Validation.rules, {
  // Field must have 8+ characters
  length: {
    rule: function (value) {
      return value.length > 7;
    },
    hint: function (value) {
      return React.createElement(
        "span",
        { className: "form-error is-visible" },
        "Password must be at least 8 characters"
      );
    }
  },
  // Field is required
  required: {
    // Make sure what we get is strings
    rule: function (value) {
      return value.toString().trim();
    },
    hint: function (value) {
      return React.createElement(
        "span",
        { className: "form-error is-visible" },
        "Required"
      );
    }
  },
  // Make sure email field is email
  email: {
    rule: function (value) {
      return validator.isEmail(value);
    },
    hint: function (value) {
      return React.createElement(
        "span",
        { className: "form-error is-visible" },
        value,
        " is not a valid email address"
      );
    }
  },
  // Compare two password fields
  password: {
    rule: function (value, components) {
      var password = components.password.state;
      var passwordConfirm = components.passwordConfirm.state;
      var isBothUsed = password && passwordConfirm && password.isUsed && passwordConfirm.isUsed;
      var isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

      if (!isBothUsed || !isBothChanged) {
        return true;
      }

      return password.value === passwordConfirm.value;
    },
    hint: function () {
      return React.createElement(
        "span",
        { className: "form-error is-visible" },
        "Passwords should match"
      );
    }
  },
  // Define API rule to show hint after API error response
  api: {
    // no rule needed b/c it will bubble up from DB
    hint: function (value) {
      return React.createElement(
        "button",
        { className: "form-error is-visible" },
        "API Error on \"",
        value,
        "\" value. Focus to hide."
      );
    }
  }
});
// =================== END Validation ======================

var RegisterForm = (function (Component) {
  function RegisterForm() {
    _classCallCheck(this, RegisterForm);

    _get(Object.getPrototypeOf(RegisterForm.prototype), "constructor", this).call(this);
    this.state = {
      visitor: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  _inherits(RegisterForm, Component);

  _prototypeProperties(RegisterForm, null, {
    updateVisitor: {

      // Update state with what user enters into input
      value: function updateVisitor(event) {
        var updated = Object.assign({}, this.state.visitor);
        updated[event.target.id] = event.target.value;
        this.setState({ visitor: updated });
      },
      writable: true,
      configurable: true
    },
    register: {

      // Register user if all checks out
      value: function register(event) {
        event.preventDefault();
        this.props.onRegister(this.state.visitor);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          Validation.components.Form,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(Validation.components.Input, {
              onChange: this.updateVisitor.bind(this),
              value: "username",
              className: "form-control register-field",
              name: "username", id: "username",
              validations: ["required"] })
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            null,
            React.createElement(Validation.components.Input, {
              onChange: this.updateVisitor.bind(this),
              value: "email",
              className: "form-control register-field",
              name: "email", id: "email",
              validations: ["required", "email"] })
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            null,
            React.createElement(Validation.components.Input, {
              onChange: this.updateVisitor.bind(this),
              type: "password",
              value: "password",
              className: "form-control register-field",
              name: "password", id: "password",
              validations: ["length", "required", "password"] })
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            null,
            React.createElement(Validation.components.Input, {
              onChange: this.updateVisitor.bind(this),
              type: "password",
              value: "password",
              className: "form-control register-field",
              name: "passwordConfirm", id: "passwordConfirm",
              validations: ["length", "required", "password"] })
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            null,
            React.createElement(
              Validation.components.Button,
              {
                onClick: this.register.bind(this),
                className: "btn btn-block btn-register" },
              "Join now!"
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return RegisterForm;
})(Component);

module.exports = RegisterForm;