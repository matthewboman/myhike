/*
For displaying front- and back-end errors to user
*/
import constants from '../constants'

var initialState = {
  message: ''
}

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state)

  switch (action.type) {

    case constants.MESSAGE_RECEIVED:
      console.log("MESSAGE RECEIVED: " + JSON.stringify(action.message))
      updatedState['message'] = action.message
      return updatedState

    default:
      return state
  }
}
