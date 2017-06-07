"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;


/*
TODO: build "upate email" capabilities that generates token,
      stores in DB w/ new email, mails link to user, validates,
      and updated.

      mailchimp?, nodemailer?
*/

var AccountEditor = (function (Component) {
  function AccountEditor(props) {
    _classCallCheck(this, AccountEditor);

    _get(Object.getPrototypeOf(AccountEditor.prototype), "constructor", this).call(this, props);
    this.state = {
      isEditing: false,
      profile: props.profile };
  }

  _inherits(AccountEditor, Component);

  _prototypeProperties(AccountEditor, null, {
    toggleEdit: {
      value: function toggleEdit(event) {
        event.preventDefault();
        this.setState({ isEditing: !this.state.isEditing });
      },
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile(event) {
        var updatedProfile = Object.assign({}, this.state.profile);
        var value = !event.target.value ? event.target.defaultValue : event.target.value;
        updatedProfile[event.target.id] = value;
        this.setState({ profile: updatedProfile });
      },
      writable: true,
      configurable: true
    },
    submitUpdate: {
      value: function submitUpdate(event) {
        event.preventDefault();
        this.setState({ isEditing: !this.state.isEditing });
        this.props.onUpdate(this.state.profile);
      },
      writable: true,
      configurable: true
    },
    renderProfile: {
      value: function renderProfile() {
        return React.createElement(
          "div",
          { className: "profile-block" },
          React.createElement(
            "div",
            { className: "profile-name-block" },
            React.createElement(
              "div",
              { className: "profile-title" },
              "Name: "
            ),
            React.createElement(
              "span",
              { className: "profile-name" },
              this.props.profile.firstName,
              " "
            ),
            React.createElement(
              "span",
              { className: "profile-name" },
              this.props.profile.lastName
            )
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "profile-city-block" },
            React.createElement(
              "div",
              { className: "profile-title" },
              "City: "
            ),
            React.createElement(
              "span",
              { className: "profile-city" },
              this.props.profile.city
            )
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "profile-bio-block" },
            React.createElement(
              "div",
              { className: "profile-title" },
              "Bio :"
            ),
            React.createElement(
              "p",
              { className: "profile-bio" },
              this.props.profile.bio
            )
          ),
          React.createElement("br", null),
          React.createElement(
            "button",
            { className: "btn", onClick: this.toggleEdit.bind(this) },
            "Edit"
          )
        );
      },
      writable: true,
      configurable: true
    },
    renderEditingProfile: {
      value: function renderEditingProfile() {
        return React.createElement(
          "div",
          { className: "edit-profile-block" },
          React.createElement(
            "span",
            { className: "edit-label edit-firstname" },
            "First name:"
          ),
          React.createElement("input", {
            className: "form-control",
            id: "firstName",
            onChange: this.updateProfile.bind(this),
            defaultValue: this.props.profile.firstName }),
          React.createElement("br", null),
          React.createElement(
            "span",
            { className: "edit-label edit-lastname" },
            "Last name:"
          ),
          React.createElement("input", {
            className: "form-control",
            id: "lastName",
            onChange: this.updateProfile.bind(this),
            defaultValue: this.props.profile.lastName }),
          React.createElement("br", null),
          React.createElement(
            "span",
            { className: "edit-label edit-city" },
            "City:"
          ),
          React.createElement("input", {
            className: "form-control",
            id: "city",
            onChange: this.updateProfile.bind(this),
            defaultValue: this.props.profile.city }),
          React.createElement("br", null),
          React.createElement(
            "span",
            { className: "edit-label edit-bio" },
            "Bio:"
          ),
          React.createElement("textarea", {
            className: "form-control edit-bio",
            id: "bio",
            rows: "8",
            onChange: this.updateProfile.bind(this),
            defaultValue: this.props.profile.bio }),
          React.createElement("br", null),
          React.createElement(
            "button",
            { className: "btn", onClick: this.submitUpdate.bind(this) },
            "Update"
          ),
          React.createElement(
            "button",
            { className: "btn", onClick: this.toggleEdit.bind(this) },
            "Nevermind"
          )
        );
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "account-editor" },
          this.state.isEditing == false ? this.renderProfile() : this.renderEditingProfile()
        );
      },
      writable: true,
      configurable: true
    }
  });

  return AccountEditor;
})(Component);

module.exports = AccountEditor;
/*  <input
   id="email"
   className="form-control"
   onChange={this.updateProfile.bind(this)}
   defaultValue={profile.email} />
 <br /> */