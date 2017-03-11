import constants from '../constants'
import { APIManager } from '../utils'

export default {

// ======================== User data =================================
  currentUserReceived: (credentials) => {
    return (dispatch) => {
      APIManager.post('/account/login', credentials, (err, response) => {
        if (err) {
          let msg = err.message || err
          console.error(msg)
          return
        }
        console.log(JSON.stringify(response.results))
        const user = response.results
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: user
        })
      })
    }
	},

  logoutUser: (user) => {
    return (dispatch) => {
      APIManager.get('/account/logout', null, (err, response) => {
        if (err) {
          console.error(err.message)
          return
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: null
        })
      })
    }
  },

  profileCreated: (profile) => {
    return {
      type: constants.PROFILE_CREATED,
      profile: profile
    }
  },

// ======================== Hike and Map data ===============================
  currentHikeReceived: (hike) => {
    return {
      type: constants.CURRENT_HIKE_RECEIVED,
      hike: hike,
    }
  },

  fetchHikes: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        reducer: 'map',
        status: 'loading'
      })

      APIManager.get('/api/hike', params, (err, response) => {
        if (err) {
          console.error(err)
          return
        }
        const hikes = response.results

        dispatch({
          type: constants.HIKES_RECEIVED,
          hikes: hikes
        })
      })
    }
  },

  fetchReviews: (params) => {
    return (dispatch) => {
      // console.log('searching for reviews for ' + JSON.stringify(hike))
      APIManager.get('/api/review', params, (err, response) => {
        if (err) {
          console.error(err)
          return
        }
        const reviews = response.results
        console.log('actions received reviews ' + JSON.stringify(reviews))
        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: reviews
        })
      })
    }
  },

  hikeCreated: (hike) => {
    return (dispatch) => {
      APIManager.post('/api/hike', hike, (err, response) => {
        if (err) {
          console.error('ERROR: ' + err.message)
        }
        const newHike = response.result

        dispatch({
          type: constants.HIKE_ADDED,
          hike: newHike
        })
      })
    }
  },

  hikeSelected: (id) => {
    let hike = id.toString()
    let url = '/api/hike/' + hike
    return (dispatch) => {
      // GET hike details
      APIManager.get(url, null, (err, response) => {
        if (err) {
          console.error('ERROR: ' + err.message)
        }
        const selectedHike = response.result

        dispatch({
          type: constants.CURRENT_HIKE_RECEIVED,
          currentHike: selectedHike
        })
      })
    }
  },

  locationAdded: (location) => {
    return {
      type: constants.LOCATION_ADDED,
      location: location
    }
  },

  reviewCreated: (review, hikeId) => {
    return (dispatch) => {
      // console.log('action sez review is ' + review)
      APIManager.post('/api/review', review, (err, response) => {
        if (err) {
          console.error('Error: ' + err.message)
        }
        const reviews = response.result

        dispatch({
          type: constants.REVIEWS_RECEIVED,
          hikeId: hikeId,
          reviews: reviews
        })
      })
    }
  },


  userLocationReceived: (center) => {
    return {
      type: constants.USER_LOCATION_RECEIVED,
      center: center
    }
  },



}
