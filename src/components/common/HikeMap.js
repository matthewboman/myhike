import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import actions from '../../actions'
import { APIManager } from '../../utils'

/*
  TODO: GET hikes from DB only within certain radius of user. Update API call
    to database as view window changes. That way the app isn't calling every
    hike in DB--only those necessary.
*/

class HikeMap extends Component {
  constructor() {
    super()
    this.state = {
      mapCenter: { lat: 0, lng: 0 }
    }
  }

  componentDidMount() {
    this.centerMapToUserLocation()
    this.props.fetchHikes(null)
  }

  centerMapToUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        mapCenter: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
      this.props.userLocationReceived({lat: position.coords.latitude, lng: position.coords.longitude})
    }, (error) => {
        this.props.displayError("Error dectecting your location")
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
  }

  addMarker(event) {
    let clicked = Object.assign({}, this.state.newHike)
    clicked.lat = event.latLng.lat()
    clicked.lng = event.latLng.lng()
    this.props.markClickedLocation(clicked, true)
  }

  selectHike(id) {
    this.props.hikeSelected(id)
    browserHistory.push(`/hike/${id}`)
  }

  renderHikeMarkers() {
    if (this.props.hikes == null || undefined)
      return false

    return this.props.hikes.map((hike, id) => {
      const hikeMarker = {
        position: { lat: hike.position.lat, lng: hike.position.lng },
        id : hike.id
      }
      return <Marker key={id}
                {...hikeMarker}
                onClick={this.selectHike.bind(this, hike.id)}
                icon={{ url:'/images/icon-green.svg', scaledSize: new google.maps.Size(28, 28) }}
              />
    })
  }

  renderNewHikeMarker() {
    const marker = {
      position: (this.props.usingMap) ? this.props.clickedLocation : this.props.hikeLocation
    }
    return (
      <Marker
          {...marker}
          icon={{ url:'/images/map-localization.svg', scaledSize: new google.maps.Size(28, 28) }}
        />
    )
  }

  render() {
    if (this.state.mapCenter.lat == 0 && this.state.mapCenter.lng == 0)
      return null

    return (
      <GoogleMapLoader
        containerElement = { this.props.mapContainer }
        googleMapElement = {
          <GoogleMap
            defaultZoom={10}
            defaultCenter={this.state.mapCenter}
            options={{streetViewControl: false, mapTypeControl: true}}
            onClick={this.addMarker.bind(this)} >
            { this.renderNewHikeMarker() }
            { this.renderHikeMarkers() }
          </GoogleMap>
        }
        />
    )
  }
}

const stateToProps = (state) => {
  return {
    hikes: state.map.list,
    clickedLocation: state.hike.clickedLocation,
    userLocation: state.hike.userLocation,
    hikeLocation: state.hike.hikeLocation,
    usingMap: state.hike.usingMap
  }
}

const dispatchToProps = (dispatch) => {
	return {
    currentHikeReceived: (hike) => dispatch(actions.currentHikeReceived(hike)),
    fetchHikes: (params) => dispatch(actions.fetchHikes(params)),
    hikeSelected: (id) => dispatch(actions.hikeSelected(id)),
    markClickedLocation: (location, usingMap) => dispatch(actions.markClickedLocation(location, usingMap)),
    markHikeLocation: (location) => dispatch(actions.markHikeLocation(location)),
    userLocationReceived: (position) => dispatch(actions.userLocationReceived(position)),
	}
}

export default connect(stateToProps, dispatchToProps)(HikeMap)
