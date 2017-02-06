import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import actions from '../../actions'
import { APIManager } from '../../utils'

class Map extends Component {
  constructor() {
    super()
    this.state = {
      newHike : {
        lat: 35.578663399999996,
        lng: -82.6077827
      },
      center: {
        lat: 0,
        lng: 0
      }
    }
  }

  componentDidMount() {
    // Center map on user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        // console.log("getCurrentPosition Success " + lat + lng)
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })
      },
      (error) => {
        this.props.displayError("Error dectecting your location");
        console.error(JSON.stringify(error))
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
// =========================== Actual code ====================================
    // GET hikes from database
    /*
    This will have to be changed so it's only grabbing hikes within
    view window of user
    */
    // APIManager.get('/api/hike', null, (err, response) => {
    //   if (err) {
    //     return
    //   }
    //   this.props.hikesReceived(response.results)
    // })
// ========================== End actual code ================================

// ========================== Dummy data for github demo =====================
    this.props.hikesReceived(
      [
      {
      "_id": "58988977ffa2d55508c709a2",
      "__v": 0,
      "review": {
      "pictures": [],
      "animals": "(unidentified) small black salamander, (unidentified) copper butterfly",
      "fungi": "chanterelles",
      "plants": "rhododendron, mountain ash, black and yellow birch, mountain angelica, blue berries, skunk goldenrod, yarrow, white snakeroot",
      "description": "A short hike up to a grassy/health bald. It's always crowded during tourist season, and parking can be hard to find. There are a couple of trails--one that heads to a waterfall about 4 miles away.",
      "user": "crash"
      },
      "position": {
      "lat": 35.70407740396727,
      "lng": -82.37317085266113
      },
      "name": "Craggy Gardens"
      }
      ]
    )
// =========================== End dummy data ===================================
  }

  componentDidUpdate() {
    // console.log('updated list of hikes ' + JSON.stringify(this.props.hikes))
  }

  addMarker(event) {
    let clicked = Object.assign({}, this.state.newHike)
    clicked.lat = event.latLng.lat()
    clicked.lng = event.latLng.lng()
    this.setState({
      newHike: clicked
    })
    this.props.locationAdded(clicked)
    browserHistory.push(`/add-hike`)
  }

  onMarkerClick(id) {
    const hikeId = id
    // Set params to be fetched
    this.props.hikeSelected(hikeId)
    // GET hike data from database
    const hack = "/api/hike/" + hikeId
    APIManager.get(hack, null, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
      this.props.currentHikeReceived(response.result)
    })
    // Change path to clicked hike
    const path = `/hike/${hikeId}`
    browserHistory.push(path)
  }

  render() {
    // Set map center to user location
    const center = this.state.center
    if (center.lat == 0 && center.lng ==0) { return null }
    // Place newHike marker where user clicks
    const marker = {
      position: this.state.newHike
    }
    // Mount hike markers to map
    if (this.props.hikes == null || undefined) { return false }
    const hikes = this.props.hikes.map((hike, id) => {
      const hikeMarker = {
        position: {
          lat: hike.position.lat,
          lng: hike.position.lng
        },
        id : hike._id
      }
      return <Marker
                key={id}
                {...hikeMarker}
                onClick={this.onMarkerClick.bind(this, hike._id)}
              />
    })

    return (
      <GoogleMapLoader
        containerElement = { this.props.mapContainer }
        googleMapElement = {
          <GoogleMap
            defaultZoom={10}
          /*  defaultCenter={this.props.center} */
            defaultCenter={this.state.center}
            options={{streetViewControl: false, mapTypeControl: false}}
            onClick={this.addMarker.bind(this)} >
             <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(index)}
              />
              {hikes}
          </GoogleMap>
        } />
    )
  }
}

const stateToProps = (state) => {
  return {
    hikes: state.hike.list,
    location: state.newHike
  }
}

const dispatchToProps = (dispatch) => {
	return {
    currentHikeReceived: (hike) => dispatch(actions.currentHikeReceived(hike)),
    hikesReceived: (hikes) => dispatch(actions.hikesReceived(hikes)),
    hikeSelected: (hike) => dispatch(actions.hikeSelected(hike)),
		locationAdded: (location) => dispatch(actions.locationAdded(location)),
	}
}

export default connect(stateToProps, dispatchToProps)(Map)
