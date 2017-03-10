"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var browserHistory = require("react-router").browserHistory;
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
    register: {
      value: function register(event) {
        event.preventDefault();
        this.props.onRegister(this.state.visitor);
        browserHistory.push("/");
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "Sign Up"
          ),
          React.createElement("input", { onChange: this.updateVisitor.bind(this), className: "form-control", type: "text", id: "username", placeholder: "username" }),
          React.createElement("br", null),
          React.createElement("input", { onChange: this.updateVisitor.bind(this), className: "form-control", type: "text", id: "email", placeholder: "Email" }),
          React.createElement("br", null),
          React.createElement("input", { onChange: this.updateVisitor.bind(this), className: "form-control", type: "password", id: "password", placeholder: "Password" }),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.register.bind(this), className: "btn btn-info btn-block" },
            "Join"
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