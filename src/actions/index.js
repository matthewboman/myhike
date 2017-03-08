import constants from '../constants'
import { APIManager } from '../utils'

export default {

// ======================== User data =================================
  currentUserReceived: (profile) => {
		return {
			type: constants.CURRENT_USER_RECEIVED,
			profile: profile
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

  fetchReviews: (hike) => {
    return (dispatch) => {
      // console.log('searching for reviews for ' + JSON.stringify(hike))
      APIManager.get('/api/review', {hikeId: hike.id}, (err, response) => {
        if (err) {
          console.error(err)
          return
        }
        const reviews = response.results

        dispatch({
          type: constants.REVIEWS_RECEIVED,
          hikeId: hike.id,
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

  reviewAdded: (review, hikeId) => {
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
