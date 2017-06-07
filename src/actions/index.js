import constants from '../constants'
import { APIManager } from '../utils'

export default {

/* ======================== General =================================== */

    displayMessage: (message) => {
      return {
        type: constants.MESSAGE_RECEIVED,
        message: message,
      }
    },

    displayError: (message) => {
      return {
        type: constants.ERROR_RECEIVED,
        message: message
      }
    },

/* ======================== User data ================================= */

  // Log user in
  currentUserReceived: (credentials) => {
    return (dispatch) => {
      APIManager.post('/account/login', credentials, (err, response) => {
        if (err) {
          let msg = err.message || err
          dispatch({ type: constants.ERROR_RECEIVED, message: msg })
          return
        }
        const user = response.profile
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: user
        })
      })
    }
	},

  // Get a profile for other users to see
  fetchProfile: (id) => {
    return (dispatch) => {
      APIManager.get(`/api/profile/${id}`, null, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        if (response.result.length == 0 ) {
          dispatch ({ type: constants.ERROR_RECEIVED, message:'Profile not found' })
          return
        }
        const profile = response.result
        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: profile
        })
      })
    }
  },

  // Log user out
  logoutUser: (user) => {
    return (dispatch) => {
      APIManager.get('/account/logout', null, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: null
        })
      })
    }
  },

  // Create new profile
  profileCreated: (profile) => {
    return (dispatch) => {
      APIManager.post('/account/register', profile, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }

        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.profile
        })
      })
    }
  },

  // Update Profile
  profileUpdated: (user, profile) => {
    return (dispatch) => {
      APIManager.put(`/api/profile/${user.id}`, profile, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.result
        })
      })
    }
  },


/* ======================== Hike and Map data ============================== */
  currentHikeReceived: (hike) => {
    return {
      type: constants.CURRENT_HIKE_RECEIVED,
      hike: hike,
    }
  },

  // Get hikes to display on map
  fetchHikes: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        reducer: 'map',
        status: 'loading'
      })

      APIManager.get('/api/hike', params, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        dispatch({
          type: constants.HIKES_RECEIVED,
          hikes: response.results
        })
      })
    }
  },

  // Create a new hike
  hikeCreated: (hike) => {
    return (dispatch) => {
      APIManager.post('/api/hike', hike, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        dispatch({
          type: constants.HIKE_ADDED,
          hike: response.result
        })
      })
    }
  },

  // Select a hike
  hikeSelected: (id) => {
    const hike = id.toString()
    return (dispatch) => {
      // GET hike details
      APIManager.get(`/api/hike/${hike}`, null, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        dispatch({
          type: constants.CURRENT_HIKE_RECEIVED,
          currentHike: response.result
        })
      })
    }
  },

  // Get user location (for using current location as hike location)
  userLocationReceived: (position) => {
    return {
      type: constants.USER_LOCATION_RECEIVED,
      position: position
    }
  },

  // Mark location clicked on map
  markClickedLocation: (location, usingMap) => {
    return {
      type: constants.MARK_CLICKED_LOCATION,
      location: location,
      usingMap: usingMap
    }
  },

  // Mark hike location on map
  markHikeLocation: (location, usingMap) => {
    return {
      type: constants.MARK_HIKE_LOCATION,
      location: location,
      usingMap: usingMap
    }
  },

/* ====================== Review Data ====================================== */

  // Get reviews for a specific hike
  fetchReviews: (params) => {
    return (dispatch) => {
      APIManager.get('/api/review', params, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: response.results
        })
      })
    }
  },

  // Allow user to add new review to a hike
  reviewCreated: (review, params) => {
    return (dispatch) => {
      APIManager.post('/api/review', review, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        const reviews = [response.result] // <------? figure this out

        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: reviews
        })
      })
    }
  },

  // Update a user's review of a hike
  reviewUpdated: (review) => {
    return (dispatch) => {
      APIManager.put(`/api/review/${review.id}`, review, (err, response) => {
        if (err) {
          dispatch ({ type: constants.ERROR_RECEIVED, message: err.message })
          return
        }
        dispatch({
          type: constants.REVIEW_UPDATED,
          review: response.result
        })
      })
    }
  },

}
