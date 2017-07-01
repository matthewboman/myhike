"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var SearchDifficulty = _interopRequire(require("./SearchDifficulty"));

var SearchFeatures = _interopRequire(require("./SearchFeatures"));

var SearchMany = _interopRequire(require("./SearchMany"));

var Review = require("../Reviews").Review;
var HomePage = (function (Component) {
  function HomePage(props) {
    _classCallCheck(this, HomePage);

    _get(Object.getPrototypeOf(HomePage.prototype), "constructor", this).call(this, props);
    this.state = {};
  }

  _inherits(HomePage, Component);

  _prototypeProperties(HomePage, null, {
    renderSearchResults: {
      value: function renderSearchResults() {
        if (this.props.searchResults && this.props.searchResults.length > 0) {
          return this.props.searchResults.map(function (review, i) {
            return React.createElement(Review, { key: i,
              review: review,
              displayName: true });
          });
        }
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "homepage-right" },
          React.createElement(
            "div",
            { className: "homepage-header-background-image" },
            React.createElement(
              "div",
              { className: "home-text" },
              React.createElement(
                "div",
                { className: "home-instructions" },
                "Use the map to search for a hike, or sign in to create/review hikes of your own"
              ),
              React.createElement(SearchDifficulty, {
                searchByDifficulty: this.props.searchByDifficulty.bind(this) }),
              React.createElement(SearchFeatures, {
                searchByFeatures: this.props.searchByFeatures.bind(this) }),
              React.createElement(SearchMany, {
                searchByField: this.props.searchByField.bind(this) }),
              this.renderSearchResults()
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return HomePage;
})(Component);

module.exports = HomePage;