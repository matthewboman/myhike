"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _reactGoogleMaps = require("react-google-maps");

var GoogleMapLoader = _reactGoogleMaps.GoogleMapLoader;
var GoogleMap = _reactGoogleMaps.GoogleMap;
var Marker = _reactGoogleMaps.Marker;
var connect = require("react-redux").connect;
var browserHistory = require("react-router").browserHistory;
var actions = _interopRequire(require("../../actions"));

var APIManager = require("../../utils").APIManager;


/*
  TODO: Pass props of user location to app state instead of setting user location
    as the local state. That way, user can set hike location to their current
    location in the CreateHike component.
  TODO: GET hikes from DB only within certain radius of user. Update API call
    to database as view window changes. That way the app isn't calling every
    hike in DB--only those necessary.
  TODO: One color marker for hikes, another color marker for where the user clicks.
*/

var Map = (function (Component) {
  function Map() {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), "constructor", this).call(this);
    this.state = {
      center: {
        lat: 0,
        lng: 0
      }
    };
  }

  _inherits(Map, Component);

  _prototypeProperties(Map, null, {
    componentDidMount: {
      value: function componentDidMount() {
        var _this = this;
        // Center map on user's location (or 0,0 if user doesn't want to share)
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          _this.setState({
            center: {
              lat: lat,
              lng: lng }
          });

          //  pass to props for "CreateHike" component
          _this.props.userLocationReceived({
            center: {
              lat: lat,
              lng: lng
            }
          });
        }, function (error) {
          _this.props.displayError("Error dectecting your location");
          console.error(JSON.stringify(error));
        }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        // GET hikes from database
        this.props.fetchHikes(null);
      },
      writable: true,
      configurable: true
    },
    addMarker: {

      // Add marker to map where user clicks and re-direct to CreateHike component
      value: function addMarker(event) {
        console.log("marker added");
        // Display marker where user clicks
        var clicked = Object.assign({}, this.state.newHike);
        clicked.lat = event.latLng.lat();
        clicked.lng = event.latLng.lng();
        this.setState({
          newHike: clicked
        });
        // Set app state location to where user clicks
        this.props.locationAdded(clicked);
        // Open CreateHike component on right side
        browserHistory.push("/add-hike");
      },
      writable: true,
      configurable: true
    },
    selectHike: {
      value: function selectHike(id) {
        this.props.hikeSelected(id);
        var path = "/hike/" + id;
        browserHistory.push(path);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        // Set map center to user location (component state version)
        var center = this.state.center;
        if (center.lat == 0 && center.lng == 0) {
          return null;
        }

        // Place newHike marker where user clicks
        var marker = {
          position: this.state.newHike
        };

        // Mount hike markers to map
        if (this.props.hikes == null || undefined) {
          return false;
        }

        var hikes = this.props.hikes.map(function (hike, id) {
          var hikeMarker = {
            position: {
              lat: hike.position.lat,
              lng: hike.position.lng
            },
            id: hike.id
          };
          return React.createElement(Marker, _extends({
            key: id
          }, hikeMarker, {
            onClick: _this.selectHike.bind(_this, hike.id)
          }));
        });

        return React.createElement(GoogleMapLoader, {
          containerElement: this.props.mapContainer,
          googleMapElement: React.createElement(
            GoogleMap,
            {
              defaultZoom: 10,
              defaultCenter: this.state.center,
              options: { streetViewControl: false, mapTypeControl: false },
              onClick: this.addMarker.bind(this) },
            React.createElement(Marker, marker),
            hikes
          )
        });
      },
      writable: true,
      configurable: true
    }
  });

  return Map;
})(Component);

var stateToProps = function (state) {
  return {
    hikes: state.map.list,
    userLocation: state.hike.center };
};

var dispatchToProps = function (dispatch) {
  return {
    currentHikeReceived: function (hike) {
      return dispatch(actions.currentHikeReceived(hike));
    },
    fetchHikes: function (params) {
      return dispatch(actions.fetchHikes(params));
    },
    hikeSelected: function (id) {
      return dispatch(actions.hikeSelected(id));
    },
    locationAdded: function (location) {
      return dispatch(actions.locationAdded(location));
    },
    userLocationReceived: function (center) {
      return dispatch(actions.userLocationReceived(center));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(Map);