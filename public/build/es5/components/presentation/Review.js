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
var Modal = _interopRequire(require("react-modal"));

var Images = require("../presentation").Images;
var ImageHelper = require("../../utils").ImageHelper;


var customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

var CreateHike = (function (Component) {
  function CreateHike(props) {
    _classCallCheck(this, CreateHike);

    _get(Object.getPrototypeOf(CreateHike.prototype), "constructor", this).call(this, props);
    this.state = {
      isEditing: false,
      review: props.review,
      currentPicture: "",
      modalIsOpen: false }, this.closeModal = this.closeModal.bind(this);
  }

  _inherits(CreateHike, Component);

  _prototypeProperties(CreateHike, null, {
    toggleEdit: {

      // Show/hide review editing capabilities
      value: function toggleEdit(event) {
        event.preventDefault();
        this.setState({
          isEditing: !this.state.isEditing
        });
      },
      writable: true,
      configurable: true
    },
    updateReview: {

      // Update only the fields that the user edited
      value: function updateReview(event) {
        var updatedReview = Object.assign({}, this.state.review);
        var value = !event.target.value ? event.target.defaultValue : event.target.value;
        updatedReview[event.target.id] = value;
        this.setState({
          review: updatedReview
        });
      },
      writable: true,
      configurable: true
    },
    submitUpdate: {
      value: function submitUpdate(event) {
        event.preventDefault();
        this.props.onUpdate(this.state.review);
        this.setState({
          isEditing: !this.state.isEditing
        });
      },
      writable: true,
      configurable: true
    },
    displayPicture: {
      value: function displayPicture(event, picture, id) {
        console.log(event);
        // BUG: for some reason picture is the first and not second argument?
        this.setState({
          currentPicture: event,
          modalIsOpen: true });
      },
      writable: true,
      configurable: true
    },
    closeModal: {
      value: function closeModal() {
        this.setState({
          modalIsOpen: false });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        var review = this.props.review;
        var reviewDate = review.timestamp.slice(0, review.timestamp.indexOf("T"));

        var author = review.user;
        var authorImage = author.image ? author.image : "/images/default-user-sm.png";
        var editable = this.props.isEditable ? this.props.isEditable : false;
        var photos = this.props.review.pictures.map(function (picture, id) {
          return React.createElement(
            "li",
            { key: id },
            React.createElement("img", {
              className: "hike-review-photo",
              src: ImageHelper.preview(picture, 150, 200),
              onClick: _this.displayPicture.bind(_this, picture, id) })
          );
        });

        var modalPicture = React.createElement("img", { src: this.state.currentPicture });

        var content = null;

        // Render review or editing mode
        if (this.state.isEditing == true) {
          content = React.createElement(
            "div",
            { className: "review-block" },
            React.createElement(
              "h4",
              { className: "review-header" },
              "Review/description: "
            ),
            React.createElement("textarea", {
              id: "description",
              className: "form-control",
              onChange: this.updateReview.bind(this),
              defaultValue: review.description }),
            React.createElement(
              "h4",
              { className: "review-header" },
              "Animals spotted: "
            ),
            React.createElement("input", {
              id: "animals",
              className: "form-control",
              onChange: this.updateReview.bind(this),
              defaultValue: review.animals }),
            React.createElement(
              "h4",
              { className: "review-header" },
              "Plants identified: "
            ),
            React.createElement("input", {
              id: "plants",
              className: "form-control",
              onChange: this.updateReview.bind(this),
              defaultValue: review.plants }),
            React.createElement(
              "h4",
              { className: "review-header" },
              "Mushrooms and other fungi: "
            ),
            React.createElement("input", {
              id: "fungi",
              className: "form-control",
              onChange: this.updateReview.bind(this),
              defaultValue: review.fungi }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { className: "btn review-edit-button", onClick: this.submitUpdate.bind(this) },
              "Update Review"
            )
          );
        } else {
          content = React.createElement(
            "div",
            { className: "review-block" },
            React.createElement(
              "ul",
              { className: "hike-review-photos" },
              photos
            ),
            React.createElement(
              "h4",
              { className: "review-header" },
              "Review/description: "
            ),
            React.createElement(
              "p",
              { className: "review-description" },
              review.description
            ),
            React.createElement(
              "h4",
              { className: "review-header" },
              "Animals spotted: "
            ),
            React.createElement(
              "p",
              { className: "review-animals" },
              review.animals
            ),
            React.createElement(
              "h4",
              { className: "review-header" },
              "Plants identified: "
            ),
            React.createElement(
              "p",
              { className: "review-plants" },
              review.plants
            ),
            React.createElement(
              "h4",
              { className: "review-header" },
              "Mushrooms and other fungi: "
            ),
            React.createElement(
              "p",
              { className: "review-fungi" },
              review.fungi
            ),
            React.createElement("img", { className: "icon-image", src: ImageHelper.thumbnail(authorImage, 40) }),
            React.createElement(
              "span",
              null,
              React.createElement(
                Link,
                { to: "../profile/" + author.id },
                author.username
              )
            ),
            React.createElement(
              "span",
              null,
              " | "
            ),
            React.createElement(
              "span",
              null,
              reviewDate
            ),
            editable ? React.createElement(
              "button",
              { className: "btn review-edit-button", onClick: this.toggleEdit.bind(this) },
              "Edit Review"
            ) : null
          );
        }

        return React.createElement(
          "div",
          null,
          content,
          React.createElement(
            Modal,
            {
              isOpen: this.state.modalIsOpen,
              onRequestClose: this.closeModal,
              style: customStyles,
              contentLabel: "Picture Modal"
            },
            React.createElement(
              "button",
              { className: "x-button", onClick: this.closeModal },
              "X"
            ),
            modalPicture
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CreateHike;
})(Component);

module.exports = CreateHike;