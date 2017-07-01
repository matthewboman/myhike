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

var field = [{ value: "animals", label: "animals" }, { value: "plants", label: "plants" }, { value: "fungi", label: "fungi" }];

var SearchMany = (function (Component) {
  function SearchMany(props) {
    _classCallCheck(this, SearchMany);

    _get(Object.getPrototypeOf(SearchMany.prototype), "constructor", this).call(this, props);
    this.state = {
      field: "",
      term: ""
    };
  }

  _inherits(SearchMany, Component);

  _prototypeProperties(SearchMany, null, {
    updateSearchTerm: {
      value: function updateSearchTerm(event) {
        this.setState({ term: event.target.value });
      },
      writable: true,
      configurable: true
    },
    searchByField: {
      value: function searchByField() {
        this.props.searchByField(this.state.field.value, this.state.term);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        return React.createElement(
          "div",
          { className: "search-many-container" },
          React.createElement(
            "div",
            { className: "search-header" },
            "Search in categories"
          ),
          React.createElement("input", { className: "form-control",
            placeholder: "Seach for",
            onChange: this.updateSearchTerm.bind(this) }),
          React.createElement(Select, {
            name: "term-field",
            className: "many-select",
            placeholder: "in",
            searchable: false,
            value: this.state.field,
            clearable: false,
            options: field,
            autoBlur: true,
            onChange: function (field) {
              return _this.setState({ field: field });
            } }),
          React.createElement(
            "button",
            { className: "button-right button-default",
              onClick: this.searchByField.bind(this) },
            "Search"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return SearchMany;
})(Component);

module.exports = SearchMany;