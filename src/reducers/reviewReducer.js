import constants from '../constants'

let initialState = {
  reviewMap: {}
}

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state)
  let updatedMap = Object.assign({}, updatedState.reviewMap)

  switch (action.type) {

    case constants.REVIEWS_RECEIVED:
      // console.log("REVIEWS_RECEIVED " + JSON.stringify(action.reviews))
      let keys = Object.keys(action.params)
      let key = keys[0]
      let value = action.params[key]
      let array = (updatedMap[value]) ? updatedMap[value] : []

      action.reviews.forEach((review, i) => {
        array.push(review)
      })
      updatedMap[value] = array
      updatedState['reviewMap'] = updatedMap

      return updatedState

    case constants.REVIEW_UPDATED:
      // console.log('REVIEW_UPDATED: ' + JSON.stringify(action.review))
      let list = updatedMap[action.review.hikeId]
      let newList = []
      list.forEach((review, i) => {
        if (review.id == action.review.id) {
          newList.push(action.review)
        } else {
          newList.push(review)
        }
      })

      updatedMap[action.review.hikeId] = newList
      updatedState['reviewMap'] = updatedMap
      console.log(JSON.stringify(updatedState))
      return updatedState

    default:
      return state
  }
}
