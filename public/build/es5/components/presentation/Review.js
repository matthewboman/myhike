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
    this.state = {};
  }

  _inherits(CreateHike, Component);

  _prototypeProperties(CreateHike, null, {
    render: {
      value: function render() {
        var currentReview = this.props.currentReview;

        return React.createElement(
          "div",
          { className: "review-block" },
          React.createElement(
            "h4",
            { className: "review-header" },
            "Review/description: "
          ),
          React.createElement(
            "p",
            { className: "review-description" },
            currentReview.description
          ),
          React.createElement(
            "h4",
            { className: "review-header" },
            "Animals spotted: "
          ),
          React.createElement(
            "p",
            { className: "review-animals" },
            currentReview.animals
          ),
          React.createElement(
            "h4",
            { className: "review-header" },
            "Plants identified: "
          ),
          React.createElement(
            "p",
            { className: "review-plants" },
            currentReview.plants
          ),
          React.createElement(
            "h4",
            { className: "review-header" },
            "Mushrooms and other fungi: "
          ),
          React.createElement(
            "p",
            { className: "review-fungi" },
            currentReview.fungi
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