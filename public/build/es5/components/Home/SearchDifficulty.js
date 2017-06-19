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

var SearchDifficulty = (function (Component) {
  function SearchDifficulty(props) {
    _classCallCheck(this, SearchDifficulty);

    _get(Object.getPrototypeOf(SearchDifficulty.prototype), "constructor", this).call(this, props);
    this.state = {
      levels: [{ value: "easy", label: "easy" }, { value: "moderate", label: "moderate" }, { value: "strenuous", label: "strenuous" }, { value: "very strenuous", label: "very strenuous" }],
      term: ""
    };
  }

  _inherits(SearchDifficulty, Component);

  _prototypeProperties(SearchDifficulty, null, {
    searchByDifficulty: {
      value: function searchByDifficulty() {
        this.props.searchByDifficulty(this.state.term);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        return React.createElement(
          "div",
          { className: "search-difficulty-container" },
          React.createElement(
            "div",
            { className: "search-header" },
            "Search by difficulty"
          ),
          React.createElement(Select, {
            name: "term-field",
            className: "difficulty-select",
            placeholder: "difficulty level",
            searchable: false,
            value: this.state.term,
            clearable: false,
            options: this.state.levels,
            autoBlur: true,
            onChange: function (term) {
              return _this.setState({ term: term });
            } }),
          React.createElement(
            "button",
            { className: "button-right button-default",
              onClick: this.searchByDifficulty.bind(this) },
            "Search"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return SearchDifficulty;
})(Component);

module.exports = SearchDifficulty;