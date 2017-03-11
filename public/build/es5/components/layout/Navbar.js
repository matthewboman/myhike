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
var _reactBootstrap = require("react-bootstrap");

var Navbar = _reactBootstrap.Navbar;
var Nav = _reactBootstrap.Nav;
var NavItem = _reactBootstrap.NavItem;
var NavDropdown = _reactBootstrap.NavDropdown;
var MenuItem = _reactBootstrap.MenuItem;
var LinkContainer = require("react-router-bootstrap").LinkContainer;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions"));

var APIManager = require("../../utils").APIManager;
var Login = require("../presentation").Login;
var Navigation = (function (_React$Component) {
  function Navigation() {
    _classCallCheck(this, Navigation);

    _get(Object.getPrototypeOf(Navigation.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(Navigation, _React$Component);

  _prototypeProperties(Navigation, null, {
    componentDidMount: {

      // Check if user is logged in
      value: function componentDidMount() {
        var _this = this;
        APIManager.get("/account/currentuser", null, function (err, response) {
          if (err) {
            console.error(err);
            return;
          }
          if (response.profile == null) {
            return;
          }
          _this.props.currentUserReceived(response.profile);
        });
      },
      writable: true,
      configurable: true
    },
    login: {

      // Log user in
      value: function login(credentials) {
        var _this = this;
        APIManager.post("/account/login", credentials, function (err, response) {
          if (err) {
            var msg = err.message || err;
            console.error(msg);
            return;
          }
          _this.props.currentUserReceived(response.profile);
        });
      },
      writable: true,
      configurable: true
    },
    logout: {

      // Log user out
      value: function logout(event) {
        APIManager.get("/account/logout", null, function (err, response) {
          if (err) {
            console.error(err);
            return;
          }
        });
        this.props.currentUserReceived(null);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          Navbar,
          { collapseOnSelect: true, className: "navigation" },
          React.createElement(
            Navbar.Header,
            null,
            React.createElement(
              Navbar.Brand,
              null,
              React.createElement(
                Link,
                { to: "/" },
                "My Hike"
              )
            ),
            React.createElement(Navbar.Toggle, null)
          ),
          React.createElement(
            Navbar.Collapse,
            null,
            React.createElement(
              Nav,
              null,
              React.createElement(
                LinkContainer,
                { to: "/add-hike" },
                React.createElement(
                  NavItem,
                  null,
                  "Add a new Hike"
                )
              )
            ),
            React.createElement(
              Nav,
              { pullRight: true },
              this.props.currentUser == null ? React.createElement(
                NavItem,
                null,
                React.createElement(Login, { onLogin: this.login.bind(this) })
              ) : React.createElement(
                NavItem,
                null,
                React.createElement(
                  "button",
                  { className: "btn-login", onClick: this.logout.bind(this) },
                  "Log out ",
                  this.props.currentUser.username
                )
              ),
              this.props.currentUser == null ? React.createElement(
                LinkContainer,
                { to: "/register", className: "register" },
                React.createElement(
                  NavItem,
                  null,
                  "Register"
                )
              ) : ""
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Navigation;
})(React.Component);

var stateToProps = function (state) {
  return {
    currentUser: state.account.currentUser
  };
};

var dispatchToProps = function (dispatch) {
  return {
    currentUserReceived: function (profile) {
      return dispatch(actions.currentUserReceived(profile));
    },
    profileCreated: function (profile) {
      return dispatch(actions.profileCreated(profile));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(Navigation);