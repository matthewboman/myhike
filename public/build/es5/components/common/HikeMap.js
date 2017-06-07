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
*/

var HikeMap = (function (Component) {
  function HikeMap() {
    _classCallCheck(this, HikeMap);

    _get(Object.getPrototypeOf(HikeMap.prototype), "constructor", this).call(this);
    this.state = {
      mapCenter: { lat: 0, lng: 0 }
    };
  }

  _inherits(HikeMap, Component);

  _prototypeProperties(HikeMap, null, {
    componentDidMount: {
      value: function componentDidMount() {
        this.centerMapToUserLocation();
        this.props.fetchHikes(null);
      },
      writable: true,
      configurable: true
    },
    centerMapToUserLocation: {
      value: function centerMapToUserLocation() {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (position) {
          _this.setState({
            mapCenter: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
          _this.props.userLocationReceived({ lat: position.coords.latitude, lng: position.coords.longitude });
        }, function (error) {
          _this.props.displayError("Error dectecting your location");
        }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
      },
      writable: true,
      configurable: true
    },
    addMarker: {
      value: function addMarker(event) {
        var clicked = Object.assign({}, this.state.newHike);
        clicked.lat = event.latLng.lat();
        clicked.lng = event.latLng.lng();
        this.props.markClickedLocation(clicked, true);
      },
      writable: true,
      configurable: true
    },
    selectHike: {
      value: function selectHike(id) {
        this.props.hikeSelected(id);
        browserHistory.push("/hike/" + id);
      },
      writable: true,
      configurable: true
    },
    renderHikeMarkers: {
      value: function renderHikeMarkers() {
        var _this = this;
        if (this.props.hikes == null || undefined) {
          return false;
        }return this.props.hikes.map(function (hike, id) {
          var hikeMarker = {
            position: { lat: hike.position.lat, lng: hike.position.lng },
            id: hike.id
          };
          return React.createElement(Marker, _extends({ key: id
          }, hikeMarker, {
            onClick: _this.selectHike.bind(_this, hike.id),
            icon: { url: "/images/icon-green.svg", scaledSize: new google.maps.Size(28, 28) }
          }));
        });
      },
      writable: true,
      configurable: true
    },
    renderNewHikeMarker: {
      value: function renderNewHikeMarker() {
        var marker = {
          position: this.props.usingMap ? this.props.clickedLocation : this.props.hikeLocation
        };
        return React.createElement(Marker, _extends({}, marker, {
          icon: { url: "/images/map-localization.svg", scaledSize: new google.maps.Size(28, 28) }
        }));
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        if (this.state.mapCenter.lat == 0 && this.state.mapCenter.lng == 0) {
          return null;
        }return React.createElement(GoogleMapLoader, {
          containerElement: this.props.mapContainer,
          googleMapElement: React.createElement(
            GoogleMap,
            {
              defaultZoom: 10,
              defaultCenter: this.state.mapCenter,
              options: { streetViewControl: false, mapTypeControl: true },
              onClick: this.addMarker.bind(this) },
            this.renderNewHikeMarker(),
            this.renderHikeMarkers()
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
    clickedLocation: state.hike.clickedLocation,
    userLocation: state.hike.userLocation,
    hikeLocation: state.hike.hikeLocation,
    usingMap: state.hike.usingMap
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
    markClickedLocation: function (location, usingMap) {
      return dispatch(actions.markClickedLocation(location, usingMap));
    },
    markHikeLocation: function (location) {
      return dispatch(actions.markHikeLocation(location));
    },
    userLocationReceived: function (position) {
      return dispatch(actions.userLocationReceived(position));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(HikeMap);