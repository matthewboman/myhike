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

require("react-select/dist/react-select.css");

var SearchBar = (function (Component) {
  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    _get(Object.getPrototypeOf(SearchBar.prototype), "constructor", this).call(this, props);
    this.state = {
      searchableFields: ["plants", "animals", "fungi"],
      searchTerm: "",
      inputValue: ""
    };
  }

  _inherits(SearchBar, Component);

  _prototypeProperties(SearchBar, null, {
    filterOptions: {
      value: function filterOptions() {},
      writable: true,
      configurable: true
    },
    loadOptions: {
      value: function loadOptions() {},
      writable: true,
      configurable: true
    },
    updateInput: {
      value: function updateInput() {},
      writable: true,
      configurable: true
    },
    listHikes: {
      value: function listHikes() {},
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        return React.createElement(
          "div",
          null,
          React.createElement(Select.Async, {
            name: "search-field",
            className: "addactivitysearch-wrapper",
            placeholder: "What are you looking for?",
            value: this.state.query,
            arrowRenderer: function () {
              return "";
            },
            filterOptions: this.filterOptions.bind(this),
            clearable: false,
            autoload: false,
            cache: false,
            onBlurResetsInput: false,
            optionRenderer: this.renderOption,
            loadOptions: this.loadOptions.bind(this),
            autoBlur: true,
            onInputChange: function (inputValue) {
              return _this.setState({ inputValue: inputValue });
            },
            onInputKeyDown: this.updateInput.bind(this),
            onChange: this.listHikes.bind(this),
            onFocus: function () {
              return _this.state.query ? _this.setState({ query: undefined }) : undefined;
            },
            menuRenderer: this.menuRenderer.bind(this)
          }),
          React.createElement(Select, {
            name: "term-field",
            className: "term-wrapper",
            placeholder: "term",
            searchable: false,
            value: this.state.searchTerm,
            clearable: false,
            options: this.state.searchableFields,
            autoBlur: true,
            onChange: function (searchTerm) {
              return _this.setState({ searchTerm: searchTerm });
            }
          })
        );
      },
      writable: true,
      configurable: true
    }
  });

  return SearchBar;
})(Component);

module.exports = SearchBar;