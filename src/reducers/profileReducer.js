import constants from '../constants'

var intialState = {
  profileMap: {},
  imageMap: {}
}

export default (state = intialState, action) => {
  let updatedState = Object.assign({}, state)
  let updatedProfileMap = Object.assign({}, updatedState.profileMap)

  switch (action.type) {

    case constants.PROFILE_RECEIVED:
      // console.log("PROFILE_RECEIVED: " + JSON.stringify(action.profile))
      updatedProfileMap[action.profile.id] = action.profile
      updatedState['profileMap'] = updatedProfileMap
      return updatedState

    default:
      return state
  }
}
