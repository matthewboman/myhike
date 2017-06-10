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

var FeatureSelect = (function (Component) {
  function FeatureSelect(props) {
    _classCallCheck(this, FeatureSelect);

    _get(Object.getPrototypeOf(FeatureSelect.prototype), "constructor", this).call(this, props);
    this.state = {
      value: []
    };
  }

  _inherits(FeatureSelect, Component);

  _prototypeProperties(FeatureSelect, null, {
    updateValues: {
      value: function updateValues(value) {
        var _this = this;
        this.setState({ value: value }, function () {
          _this.props.addFeaturesToHike(_this.state.value);
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(Select, { multi: true, simpleValue: true,
          value: this.state.value,
          placeholder: "Select your favourite(s)",
          options: features,
          onChange: this.updateValues.bind(this) });
      },
      writable: true,
      configurable: true
    }
  });

  return FeatureSelect;
})(Component);

module.exports = FeatureSelect;