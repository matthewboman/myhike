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
var Lightbox = _interopRequire(require("react-image-lightbox"));

var Images = require("../common").Images;
var ImageHelper = require("../../utils").ImageHelper;
var _ = require("./");

var DifficultySelect = _.DifficultySelect;
var FeatureSelect = _.FeatureSelect;
var Review = (function (Component) {
  function Review(props) {
    _classCallCheck(this, Review);

    _get(Object.getPrototypeOf(Review.prototype), "constructor", this).call(this, props);
    this.state = {
      isEditing: false,
      review: props.review,
      images: [],
      isOpen: false,
      photoIndex: 0 };
  }

  _inherits(Review, Component);

  _prototypeProperties(Review, null, {
    componentDidMount: {
      value: function componentDidMount() {
        this.createImageList();
      },
      writable: true,
      configurable: true
    },
    createImageList: {
      value: function createImageList() {
        this.setState({ images: this.props.review.pictures });
      },
      writable: true,
      configurable: true
    },
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
      value: function displayPicture() {
        this.setState({ isOpen: true });
      },
      writable: true,
      configurable: true
    },
    updateDifficulty: {
      value: function updateDifficulty(value) {
        var updatedReview = Object.assign({}, this.state.review);
        updatedReview.difficulty = value;
        this.setState({ review: updatedReview });
      },
      writable: true,
      configurable: true
    },
    updateFeatures: {
      value: function updateFeatures(value) {
        var updatedReview = Object.assign({}, this.state.review);
        var updatedFeatures = Object.assign([], this.state.review.features);
        updatedFeatures = value.split(",");
        updatedReview.features = updatedFeatures;
        this.setState({ review: updatedReview });
      },
      writable: true,
      configurable: true
    },
    renderLightBox: {
      value: function renderLightBox() {
        var _this = this;
        return React.createElement(Lightbox, {
          mainSrc: this.state.images[this.state.photoIndex],
          nextSrc: this.state.images[(this.state.photoIndex + 1) % this.state.images.length],
          prevSrc: this.state.images[(this.state.photoIndex + this.state.images.length - 1) % this.state.images.length],

          onCloseRequest: function () {
            return _this.setState({ isOpen: false });
          },
          onMovePrevRequest: function () {
            return _this.setState({
              photoIndex: (_this.state.photoIndex + _this.state.images.length - 1) % _this.state.images.length });
          },
          onMoveNextRequest: function () {
            return _this.setState({
              photoIndex: (_this.state.photoIndex + 1) % _this.state.images.length });
          }
        });
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
            onClick: _this.displayPicture.bind(_this) });
        });
      },
      writable: true,
      configurable: true
    },
    renderDescription: {
      value: function renderDescription() {
        return React.createElement(
          "div",
          { className: "review-description-block" },
          React.createElement(
            "div",
            { className: "review-header" },
            "Review/description: "
          ),
          React.createElement(
            "div",
            { className: "review-text" },
            this.props.review.description
          )
        );
      },
      writable: true,
      configurable: true
    },
    renderDifficulty: {
      value: function renderDifficulty() {
        console.log(this.props.review.difficulty);
        return React.createElement(
          "div",
          { className: "review-difficulty-block" },
          React.createElement(
            "div",
            { className: "review-header difficulty-header" },
            "Difficulty: "
          ),
          React.createElement(
            "div",
            { className: "review-text difficulty-text" },
            this.props.review.difficulty
          )
        );
      },
      writable: true,
      configurable: true
    },
    renderFeatures: {
      value: function renderFeatures() {
        return this.props.review.features.map(function (feature, id) {
          return React.createElement(
            "span",
            { key: id, className: "review-feature" },
            feature,
            ", "
          );
        });
      },
      writable: true,
      configurable: true
    },
    renderAnimals: {
      value: function renderAnimals() {
        return React.createElement(
          "div",
          { className: "review-animals-block" },
          React.createElement(
            "div",
            { className: "review-header" },
            "Animals: "
          ),
          React.createElement(
            "div",
            { className: "review-text" },
            this.props.review.animals
          )
        );
      },
      writable: true,
      configurable: true
    },
    renderPlants: {
      value: function renderPlants() {
        return React.createElement(
          "div",
          { className: "review-plants-block" },
          React.createElement(
            "div",
            { className: "review-header" },
            "Plants: "
          ),
          React.createElement(
            "div",
            { className: "review-text" },
            this.props.review.plants
          )
        );
      },
      writable: true,
      configurable: true
    },
    renderFungi: {
      value: function renderFungi() {
        return React.createElement(
          "div",
          { className: "review-fungi-block" },
          React.createElement(
            "div",
            { className: "review-header" },
            "Fungi: "
          ),
          React.createElement(
            "div",
            { className: "review-text" },
            this.props.review.fungi
          )
        );
      },
      writable: true,
      configurable: true
    },
    renderUser: {
      value: function renderUser() {
        return React.createElement(
          "div",
          { className: "review-user-block" },
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
          )
        );
      },
      writable: true,
      configurable: true
    },
    renderReview: {
      value: function renderReview() {
        return React.createElement(
          "div",
          { className: "review-block" },
          this.props.displayName ? this.renderHikeName() : "",
          React.createElement(
            "div",
            { className: "hike-review-photos" },
            this.renderPhotos()
          ),
          this.props.review.description ? this.renderDescription() : "",
          this.props.review.difficulty ? this.renderDifficulty() : "",
          React.createElement(
            "div",
            { className: "review-feature-block" },
            React.createElement(
              "div",
              { className: "review-header" },
              "Features: "
            ),
            this.renderFeatures()
          ),
          this.props.review.animals ? this.renderAnimals() : "",
          this.props.review.plants ? this.renderPlants() : "",
          this.props.review.fungi ? this.renderFungi() : "",
          this.renderUser(),
          (this.props.isEditable ? this.props.isEditable : false) ? React.createElement(
            "button",
            { className: "button-default review-edit-button", onClick: this.toggleEdit.bind(this) },
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
            "Difficulty: "
          ),
          React.createElement(DifficultySelect, { addDifficultyToHike: this.updateDifficulty.bind(this) }),
          React.createElement(
            "div",
            { className: "review-header" },
            "Features: "
          ),
          React.createElement(FeatureSelect, { addFeaturesToHike: this.updateFeatures.bind(this) }),
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
    renderHikeName: {
      value: function renderHikeName() {
        return React.createElement(
          "div",
          { className: "hike-name" },
          React.createElement(
            Link,
            { to: "../hike/" + this.props.review.hikeId },
            this.props.review.hikeName
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
          this.state.isOpen ? this.renderLightBox() : "",
          this.state.isEditing ? this.renderEditableReview() : this.renderReview()
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Review;
})(Component);

module.exports = Review;