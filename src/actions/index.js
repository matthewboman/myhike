import constants from '../constants'

export default {

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

  currentHikeReceived: (hike) => {
    return {
      type: constants.CURRENT_HIKE_RECEIVED,
      hike: hike,
    }
  },

  hikesReceived: (hikes) => {
    return {
      type: constants.HIKES_RECEIVED,
      hikes: hikes
    }
  },

  hikeSelected: (hike) => {
    return {
      type: constants.HIKE_SELECTED,
      hike: hike
    }
  },

  locationAdded: (location) => {
    return {
      type: constants.LOCATION_ADDED,
      location: location
    }
  },





}
