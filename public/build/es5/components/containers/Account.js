"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Link = require("react-router").Link;
var connect = require("react-redux").connect;
var APIManager = require("../../utils").APIManager;
var actions = _interopRequire(require("../../actions"));

var Login = require("../presentation").Login;
var Account = (function (Component) {
  function Account() {
    _classCallCheck(this, Account);

    _get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(Account, Component);

  _prototypeProperties(Account, null, {
    login: {
      value: function login(credentials) {
        this.props.currentUserReceived(credentials);
      },
      writable: true,
      configurable: true
    },
    logout: {
      value: function logout(event) {
        event.preventDefault();
        this.props.logoutUser(null);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        /*
          Display login/signup if user is not logged in.
          If user is logged in, display profile link and logout.
        */
        var content = null;

        if (this.props.user == null) {
          content = React.createElement(
            "div",
            null,
            React.createElement(Login, { onLogin: this.login.bind(this) }),
            React.createElement(
              Link,
              { to: "/register" },
              React.createElement(
                "button",
                null,
                "Register"
              )
            )
          );
        } else {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              Link,
              { to: "/currentuser" },
              React.createElement(
                "button",
                null,
                "Account"
              )
            ),
            React.createElement(
              "button",
              { onClick: this.logout.bind(this) },
              "Log out ",
              this.props.user.username
            )
          );
        }

        return React.createElement(
          "div",
          null,
          content
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Account;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    currentUserReceived: function (user) {
      return dispatch(actions.currentUserReceived(user));
    },
    logoutUser: function (user) {
      return dispatch(actions.logoutUser(user));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(Account);