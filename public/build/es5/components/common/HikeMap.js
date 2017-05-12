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
  TODO: GET hikes from DB only within certain radius of user. Update API call
    to database as view window changes. That way the app isn't calling every
    hike in DB--only those necessary.
  TODO: One color marker for hikes, another color marker for where the user clicks.
*/

var HikeMap = (function (Component) {
  function HikeMap() {
    _classCallCheck(this, HikeMap);

    _get(Object.getPrototypeOf(HikeMap.prototype), "constructor", this).call(this);
    this.state = {
      mapCenter: {
        lat: 0,
        lng: 0
      }
    };
  }

  _inherits(HikeMap, Component);

  _prototypeProperties(HikeMap, null, {
    componentDidMount: {
      value: function componentDidMount() {
        var _this = this;
        // Center map on user's location (or 0,0 if user doesn't want to share)
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          _this.setState({
            mapCenter: {
              lat: lat,
              lng: lng }
          });
          //  Pass to props for "CreateHike" component
          _this.props.userLocationReceived({ lat: lat, lng: lng });
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

      // Add marker to map where user clicks
      value: function addMarker(event) {
        var clicked = Object.assign({}, this.state.newHike);
        clicked.lat = event.latLng.lat();
        clicked.lng = event.latLng.lng();
        this.props.markHikeLocation(clicked);
      },
      writable: true,
      configurable: true
    },
    selectHike: {

      // Set currentHike to whichever hike user clicks on and change route
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
        var mapCenter = this.state.mapCenter;
        if (mapCenter.lat == 0 && mapCenter.lng == 0) {
          return null;
        }

        var marker = {
          position: this.props.hikeLocation
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
              defaultCenter: this.state.mapCenter,
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

  return HikeMap;
})(Component);

var stateToProps = function (state) {
  return {
    hikes: state.map.list,
    clickedLocation: state.map.clickedLocation,
    userLocation: state.hike.userLocation,
    hikeLocation: state.hike.hikeLocation

  };
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
    markHikeLocation: function (location) {
      return dispatch(actions.markHikeLocation(location));
    },
    userLocationReceived: function (position) {
      return dispatch(actions.userLocationReceived(position));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(HikeMap);