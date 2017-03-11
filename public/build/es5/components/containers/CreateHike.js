"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions"));

var APIManager = require("../../utils").APIManager;
var Images = require("../presentation").Images;


/*
  TODO: Allow for user to choose current location or click on map (or address?)
  TODO: Hike can be submitted only if user is logged in and location is selected
*/

var CreateHike = (function (Component) {
  function CreateHike() {
    _classCallCheck(this, CreateHike);

    _get(Object.getPrototypeOf(CreateHike.prototype), "constructor", this).call(this);
    this.state = {
      hike: {
        name: "",
        position: null,
        useAddress: false,
        address: "",
        city: "",
        state: "",
        country: ""
      } };
  }

  _inherits(CreateHike, Component);

  _prototypeProperties(CreateHike, null, {
    componentDidUpdate: {
      value: function componentDidUpdate() {},
      writable: true,
      configurable: true
    },
    updateHike: {
      value: function updateHike(event) {
        var updatedHike = Object.assign({}, this.state.hike);
        var updatedAddress = Object.assign({}, updatedHike.address);
        updatedAddress[event.target.id] = event.target.value;
        updatedHike[event.target.id] = event.target.value;
        // console.log(JSON.stringify(updatedHike))
        this.setState({
          hike: updatedHike
        });
      },
      writable: true,
      configurable: true
    },
    useCurrentLocation: {
      value: function useCurrentLocation(event) {
        var updatedHike = Object.assign({}, this.state.hike);
        updatedHike.position = this.props.userLocation.center;
        updatedHike.useAddress = false;
        this.setState({
          hike: updatedHike
        });
      },
      writable: true,
      configurable: true
    },
    useAddress: {
      value: function useAddress(event) {
        var updatedHike = Object.assign({}, this.state.hike);
        updatedHike.useAddress = true;
        this.setState({
          hike: updatedHike
        });
      },
      writable: true,
      configurable: true
    },
    useMap: {
      value: function useMap(event) {
        var updatedHike = Object.assign({}, this.state.hike);
        updatedHike.position = this.props.location;
        updatedHike.useAddress = false;
        this.setState({
          hike: updatedHike
        });
      },
      writable: true,
      configurable: true
    },
    submitHike: {
      value: function submitHike(hike) {
        console.log("submitting " + JSON.stringify(this.state.hike));
        // check if user is logged in
        // if (this.props.user == null) {
        //   alert('You must be signed up')
        //   return
        // }
        var newHike = this.state.hike;
        this.props.hikeCreated(newHike);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        // Allow user to choose hike by map or current location
        var lat = undefined;
        var lng = undefined;
        if (this.state.position != null) {
          lat = this.state.hike.position.lat;
          lng = this.state.hike.position.lng;
        }


        // Allow user to choose hike by address
        var display = "";
        var address = this.state.hike.useAddress;
        if (address == true) {
          display = React.createElement(
            "div",
            null,
            React.createElement("input", { onChange: this.updateHike.bind(this), id: "address",
              className: "form-control", type: "text", placeholder: "Address" }),
            React.createElement("br", null),
            React.createElement("input", { onChange: this.updateHike.bind(this), id: "city",
              className: "form-control", type: "text", placeholder: "City" }),
            React.createElement("br", null),
            React.createElement("input", { onChange: this.updateHike.bind(this), id: "state",
              className: "form-control", type: "text", placeholder: "State" }),
            React.createElement("br", null),
            React.createElement("input", { onChange: this.updateHike.bind(this), id: "country",
              className: "form-control", type: "text", placeholder: "Country" }),
            React.createElement("br", null)
          );
        } else {
          display = React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              null,
              "Hike location is at latitude ",
              lat,
              " and longitude ",
              lng
            )
          );
        }

        return React.createElement(
          "div",
          { className: "sidebar" },
          React.createElement(
            "h3",
            null,
            "Add a New Hike"
          ),
          React.createElement("input", { onChange: this.updateHike.bind(this), id: "name",
            className: "form-control", type: "text", placeholder: "Hike Name" }),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.useCurrentLocation.bind(this) },
            "Use current location"
          ),
          React.createElement(
            "button",
            { onClick: this.useAddress.bind(this) },
            "Enter an address"
          ),
          React.createElement(
            "button",
            { onClick: this.useMap.bind(this) },
            "Select Map Location"
          ),
          React.createElement("br", null),
          React.createElement("br", null),
          display,
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

var stateToProps = function (state) {
  return {
    location: state.hike.hikeLocation,
    currentUser: state.account.currentUser,
    userLocation: state.hike.center };
};

var dispatchToProps = function (dispatch) {
  return {
    hikeCreated: function (newHike) {
      return dispatch(actions.hikeCreated(newHike));
    },
    locationAdded: function (location) {
      return dispatch(actions.locationAdded(location));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(CreateHike);
// console.log('updating with location ' + JSON.stringify(this.props.location))
// console.log('updating with user location ' + JSON.stringify(this.props.userLocation))