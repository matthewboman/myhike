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
  TODO: One color marker for hikes, another color marker for where the user clicks.
*/

class HikeMap extends Component {
  constructor() {
    super()
    this.state = {
      mapCenter: {
        lat: 0,
        lng: 0
      }
    }
  }

  componentDidMount() {
    // Center map on user's location (or 0,0 if user doesn't want to share)
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      this.setState({
        mapCenter: {
          lat: lat,
          lng: lng,
        }
      })
      //  Pass to props for "CreateHike" component
      this.props.userLocationReceived({lat: lat, lng: lng})
      },
      (error) => {
        this.props.displayError("Error dectecting your location");
        console.error(JSON.stringify(error))
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    // GET hikes from database
    this.props.fetchHikes(null)
  }

  // Add marker to map where user clicks
  addMarker(event) {
    let clicked = Object.assign({}, this.state.newHike)
    clicked.lat = event.latLng.lat()
    clicked.lng = event.latLng.lng()
    this.props.markHikeLocation(clicked)
  }

  // Set currentHike to whichever hike user clicks on and change route
  selectHike(id) {
    this.props.hikeSelected(id)
    const path = `/hike/${id}`
    browserHistory.push(path)
  }

  render() {
    // Set map center to user location (component state version)
    const mapCenter = this.state.mapCenter
    if (mapCenter.lat == 0 && mapCenter.lng == 0) { return null }

    const marker = {
      position: this.props.hikeLocation
    }

    // Mount hike markers to map
    if (this.props.hikes == null || undefined) { return false }

    const hikes = this.props.hikes.map((hike, id) => {
      const hikeMarker = {
        position: {
          lat: hike.position.lat,
          lng: hike.position.lng
        },
        id : hike.id
      }
      return <Marker
                key={id}
                {...hikeMarker}
                onClick={this.selectHike.bind(this, hike.id)}
              />
    })


    return (
      <GoogleMapLoader
        containerElement = { this.props.mapContainer }
        googleMapElement = {
          <GoogleMap
            defaultZoom={10}
            defaultCenter={this.state.mapCenter}
            options={{streetViewControl: false, mapTypeControl: false}}
            onClick={this.addMarker.bind(this)} >
            <Marker
                {...marker}
              />
              {hikes}
          </GoogleMap>
        }
        />
    )
  }
}

const stateToProps = (state) => {
  return {
    hikes: state.map.list,
    clickedLocation: state.map.clickedLocation,
    userLocation: state.hike.userLocation,
    hikeLocation: state.hike.hikeLocation

  }
}

const dispatchToProps = (dispatch) => {
	return {
    currentHikeReceived: (hike) => dispatch(actions.currentHikeReceived(hike)),
    fetchHikes: (params) => dispatch(actions.fetchHikes(params)),
    hikeSelected: (id) => dispatch(actions.hikeSelected(id)),
    markHikeLocation: (location) => dispatch(actions.markHikeLocation(location)),
    userLocationReceived: (position) => dispatch(actions.userLocationReceived(position)),
	}
}

export default connect(stateToProps, dispatchToProps)(HikeMap)
