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

var Images = require("../common").Images;
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

var Review = (function (Component) {
  function Review(props) {
    _classCallCheck(this, Review);

    _get(Object.getPrototypeOf(Review.prototype), "constructor", this).call(this, props);
    this.state = {
      isEditing: false,
      review: props.review,
      currentPicture: "",
      modalIsOpen: false }, this.closeModal = this.closeModal.bind(this);
  }

  _inherits(Review, Component);

  _prototypeProperties(Review, null, {
    toggleEdit: {
      value: function toggleEdit(event) {
        event.preventDefault();
        this.setState({ isEditing: !this.state.isEditing });
      },
      writable: true,
      configurable: true
    },
    updateReview: {
      value: function updateReview(event) {
        var updatedReview = Object.assign({}, this.state.review);
        var value = !event.target.value ? event.target.defaultValue : event.target.value;
        updatedReview[event.target.id] = value;
        this.setState({ review: updatedReview });
      },
      writable: true,
      configurable: true
    },
    submitUpdate: {
      value: function submitUpdate(event) {
        event.preventDefault();
        this.props.onUpdate(this.state.review);
        this.setState({ isEditing: !this.state.isEditing });
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
        this.setState({ modalIsOpen: false });
      },
      writable: true,
      configurable: true
    },
    renderPhotos: {
      value: function renderPhotos() {
        var _this = this;
        return this.props.review.pictures.map(function (picture, id) {
          return React.createElement("img", { key: id,
            className: "hike-review-photo",
            src: ImageHelper.preview(picture, 150, 200),
            onClick: _this.displayPicture.bind(_this, picture, id) });
        });
      },
      writable: true,
      configurable: true
    },
    renderReview: {
      value: function renderReview() {
        return React.createElement(
          "div",
          { className: "review-block" },
          React.createElement(
            "div",
            { className: "hike-review-photos" },
            this.renderPhotos()
          ),
          React.createElement(
            "div",
            { className: "review-header" },
            "Review/description: "
          ),
          React.createElement(
            "p",
            { className: "review-description" },
            this.props.review.description
          ),
          React.createElement(
            "div",
            { className: "review-header" },
            "Animals spotted: "
          ),
          React.createElement(
            "p",
            { className: "review-animals" },
            this.props.review.animals
          ),
          React.createElement(
            "div",
            { className: "review-header" },
            "Plants identified: "
          ),
          React.createElement(
            "p",
            { className: "review-plants" },
            this.props.review.plants
          ),
          React.createElement(
            "div",
            { className: "review-header" },
            "Mushrooms and other fungi: "
          ),
          React.createElement(
            "p",
            { className: "review-fungi" },
            this.props.review.fungi
          ),
          React.createElement("img", { className: "icon-image",
            src: ImageHelper.thumbnail(this.props.review.user.image ? this.props.review.user.image : "/images/default-user-sm.png", 40) }),
          React.createElement(
            "span",
            null,
            React.createElement(
              Link,
              { to: "../profile/" + this.props.review.user.id },
              this.props.review.user.username
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
            this.props.review.timestamp.slice(0, this.props.review.timestamp.indexOf("T"))
          ),
          (this.props.isEditable ? this.props.isEditable : false) ? React.createElement(
            "button",
            { className: "btn review-edit-button", onClick: this.toggleEdit.bind(this) },
            "Edit Review"
          ) : null
        );
      },
      writable: true,
      configurable: true
    },
    renderEditableReview: {
      value: function renderEditableReview() {
        return React.createElement(
          "div",
          { className: "review-block editable-review" },
          React.createElement(
            "div",
            { className: "review-header" },
            "Review/description: "
          ),
          React.createElement("textarea", {
            id: "description",
            className: "form-control",
            onChange: this.updateReview.bind(this),
            defaultValue: this.props.review.description }),
          React.createElement(
            "div",
            { className: "review-header" },
            "Animals spotted: "
          ),
          React.createElement("input", {
            id: "animals",
            className: "form-control",
            onChange: this.updateReview.bind(this),
            defaultValue: this.props.review.animals }),
          React.createElement(
            "div",
            { className: "review-header" },
            "Plants identified: "
          ),
          React.createElement("input", {
            id: "plants",
            className: "form-control",
            onChange: this.updateReview.bind(this),
            defaultValue: this.props.review.plants }),
          React.createElement(
            "div",
            { className: "review-header" },
            "Mushrooms and other fungi: "
          ),
          React.createElement("input", {
            id: "fungi",
            className: "form-control",
            onChange: this.updateReview.bind(this),
            defaultValue: this.props.review.fungi }),
          React.createElement("br", null),
          React.createElement(
            "button",
            { className: "btn review-edit-button", onClick: this.submitUpdate.bind(this) },
            "Update Review"
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
          null,
          this.state.isEditing ? this.renderEditableReview() : this.renderReview(),
          React.createElement(
            Modal,
            {
              isOpen: this.state.modalIsOpen,
              onRequestClose: this.closeModal,
              style: customStyles,
              contentLabel: "Picture Modal" },
            React.createElement(
              "button",
              { className: "x-button", onClick: this.closeModal },
              "X"
            ),
            React.createElement("img", { src: this.state.currentPicture, className: "large-review-image" })
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Review;
})(Component);

module.exports = Review;