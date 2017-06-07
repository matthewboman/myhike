"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions"));

var APIManager = require("../../utils").APIManager;
var RegisterForm = require("./").RegisterForm;
var Register = (function (Component) {
  function Register() {
    _classCallCheck(this, Register);

    _get(Object.getPrototypeOf(Register.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(Register, Component);

  _prototypeProperties(Register, null, {
    register: {
      value: function register(profile) {
        this.props.profileCreated(profile);
        this.props.onClose();
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "register" },
          this.props.error ? this.props.error : "",
          React.createElement(RegisterForm, { onRegister: this.register.bind(this) })
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Register;
})(Component);

var stateToProps = function (state) {
  return {
    error: state.message.error
  };
};

var dispatchToProps = function (dispatch) {
  return {
    profileCreated: function (profile) {
      return dispatch(actions.profileCreated(profile));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(Register);