"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = require("../../utils").APIManager;
var Login = (function (Component) {
  function Login() {
    _classCallCheck(this, Login);

    _get(Object.getPrototypeOf(Login.prototype), "constructor", this).call(this);
    this.state = {
      visitor: {
        username: "",
        password: ""
      }
    };
  }

  _inherits(Login, Component);

  _prototypeProperties(Login, null, {
    updateVisitor: {
      value: function updateVisitor(event) {
        var updated = Object.assign({}, this.state.visitor);
        updated[event.target.id] = event.target.value;
        this.setState({
          visitor: updated
        });
      },
      writable: true,
      configurable: true
    },
    login: {
      value: function login(event) {
        event.preventDefault();
        console.log(this.state.visitor + " allegedly logged in");
        this.props.onLogin(this.state.visitor);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement("input", { className: "login-form", onChange: this.updateVisitor.bind(this), type: "text", id: "username", placeholder: "username" }),
          React.createElement("input", { className: "login-form", onChange: this.updateVisitor.bind(this), type: "password", id: "password", placeholder: "Password" }),
          React.createElement(
            "button",
            { className: "btn-login", onClick: this.login.bind(this) },
            "Log in"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Login;
})(Component);

module.exports = Login;