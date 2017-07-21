"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var Validation = _interopRequire(require("react-validation"));

var validator = _interopRequire(require("validator"));

Object.assign(Validation.rules, {
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
  required: {
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
  api: {
    hint: function (value) {
      return React.createElement(
        "button",
        { className: "form-error is-visible" },
        "API Error on \"",
        value,
        "\" value."
      );
    }
  }
});

module.exports = Validation;