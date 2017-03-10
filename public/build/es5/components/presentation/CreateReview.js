"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Images = require("../presentation").Images;
var CreateHike = (function (Component) {
  function CreateHike() {
    _classCallCheck(this, CreateHike);

    _get(Object.getPrototypeOf(CreateHike.prototype), "constructor", this).call(this);
    this.state = {
      review: {
        animals: "",
        description: "",
        fungi: "",
        pictures: [],
        plants: "",
        user: "" }
    };
  }

  _inherits(CreateHike, Component);

  _prototypeProperties(CreateHike, null, {
    updateHike: {
      value: function updateHike(event) {
        var updatedReview = Object.assign({}, this.state.review);
        updatedReview[event.target.id] = event.target.value;
        updatedReview.user = this.props.user;
        // console.log(updatedReview)
        this.setState({
          review: updatedReview
        });
      },
      writable: true,
      configurable: true
    },
    addImages: {
      value: function addImages(event) {
        var updatedReview = Object.assign({}, this.state.review);
        // Add images from Image component
        var updatedImages = Object.assign([], this.state.review.pictures);
        for (var _iterator = event[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var value = _step.value;
          updatedImages.push(value.secure_url);
        }
        updatedReview.pictures = updatedImages;

        this.setState({
          review: updatedReview
        });
      },
      writable: true,
      configurable: true
    },
    submitHike: {
      value: function submitHike(review) {
        event.preventDefault();
        this.props.onReview(this.state.review);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "sidebar" },
          React.createElement(
            "h3",
            null,
            "Add your own review"
          ),
          React.createElement("input", { onChange: this.updateHike.bind(this), id: "description",
            className: "form-control", type: "text", placeholder: "Describe it!" }),
          React.createElement("br", null),
          React.createElement("input", { onChange: this.updateHike.bind(this), id: "plants",
            className: "form-control", type: "text", placeholder: "What plants?" }),
          React.createElement("br", null),
          React.createElement("input", { onChange: this.updateHike.bind(this), id: "fungi",
            className: "form-control", type: "text", placeholder: "What mushrooms?" }),
          React.createElement("br", null),
          React.createElement("input", { onChange: this.updateHike.bind(this), id: "animals",
            className: "form-control", type: "text", placeholder: "What animals" }),
          React.createElement("br", null),
          React.createElement(Images, { onImageSubmit: this.addImages.bind(this) }),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.submitHike.bind(this),
              className: "btn btn-info btn-block" },
            "Add it"
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