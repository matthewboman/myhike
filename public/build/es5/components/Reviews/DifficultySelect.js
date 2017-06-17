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

var difficulty = [{ value: "easy", label: "easy" }, { value: "moderate", label: "moderate" }, { value: "strenuous", label: "strenuous" }, { value: "very strenuous", label: "very strenuous" }];

var DifficultySelect = (function (Component) {
  function DifficultySelect(props) {
    _classCallCheck(this, DifficultySelect);

    _get(Object.getPrototypeOf(DifficultySelect.prototype), "constructor", this).call(this, props);
    this.state = {
      difficulty: ""
    };
  }

  _inherits(DifficultySelect, Component);

  _prototypeProperties(DifficultySelect, null, {
    updateDifficulty: {
      value: function updateDifficulty(difficulty) {
        var _this = this;
        this.setState({ difficulty: difficulty }, function () {
          _this.props.addDifficultyToHike(_this.state.difficulty);
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(Select, { name: "difficulty",
          value: this.state.difficulty,
          options: difficulty,
          onChange: this.updateDifficulty.bind(this),
          placeholder: "Difficulty" });
      },
      writable: true,
      configurable: true
    }
  });

  return DifficultySelect;
})(Component);

module.exports = DifficultySelect;