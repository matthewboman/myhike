"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Select = _interopRequire(require("react-select"));

var features = [{ value: "waterfalls", label: "waterfalls" }, { value: "scenic views", label: "scenic views" }, { value: "river or stream", label: "river or stream" }, { value: "lake", label: "lake" }, { value: "paved path", label: "paved path" }, { value: "dirt path", value: "dirt path" }];

var SearchFeatures = (function (Component) {
  function SearchFeatures(props) {
    _classCallCheck(this, SearchFeatures);

    _get(Object.getPrototypeOf(SearchFeatures.prototype), "constructor", this).call(this, props);
    this.state = {
      value: [],
      mustIncludeAll: false };
  }

  _inherits(SearchFeatures, Component);

  _prototypeProperties(SearchFeatures, null, {
    componentDidUpdate: {
      value: function componentDidUpdate() {
        console.log(this.state.mustIncludeAll);
      },
      writable: true,
      configurable: true
    },
    updateValues: {
      value: function updateValues(value) {
        this.setState({ value: value });
      },
      writable: true,
      configurable: true
    },
    searchByFeatures: {
      value: function searchByFeatures() {
        this.props.searchByFeatures(this.state.value, this.state.mustIncludeAll);
      },
      writable: true,
      configurable: true
    },
    toggleCheckbox: {
      value: function toggleCheckbox() {
        this.setState({ mustIncludeAll: !this.state.mustIncludeAll });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "search-feature-container" },
          React.createElement(
            "div",
            { className: "search-header" },
            "Search for specific features"
          ),
          React.createElement(Select, { multi: true, simpleValue: true,
            className: "feature-select",
            value: this.state.value,
            placeholder: "Noteable features",
            options: features,
            onChange: this.updateValues.bind(this) }),
          React.createElement(
            "span",
            { className: "include-all" },
            "Hike must include all"
          ),
          React.createElement("input", { type: "checkbox",
            checked: this.state.mustIncludeAll,
            onChange: this.toggleCheckbox.bind(this) }),
          React.createElement(
            "button",
            { className: "button-right button-default",
              onClick: this.searchByFeatures.bind(this) },
            "Search"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return SearchFeatures;
})(Component);

module.exports = SearchFeatures;