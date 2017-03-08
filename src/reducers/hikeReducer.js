import constants from '../constants'

var initialState = {
  hikeLocation: null,
  list: [],
  selectedHike: 0,
  currentHike: null,
  center: null,
  reviewMap: {}
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)

  switch (action.type) {
    // Set hike location on map click
    case constants.CURRENT_HIKE_RECEIVED:
      // console.log('CURRENT_HIKE_RECEIVED ' + JSON.stringify(action.currentHike))
      updated['currentHike'] = action.currentHike
      // let updatedMap = Object.assign({}, updated.map)
      // updatedMap[action.currentHike.id] = action.currentHike
      // updated['map'] = updatedMap
      return updated

    // Hike marker on map clicked
    case constants.HIKE_SELECTED:
      // console.log('HIKE_SELECTED ' + JSON.stringify(action.hike))
      updated['selectedHike'] = action.hike
      return updated

    //
    case constants.LOCATION_ADDED:
      // console.log('LOCATION_ADDED ' + JSON.stringify(action.location))
      updated['hikeLocation'] = action.location
      return updated


    case constants.REVIEWS_RECEIVED:
      // console.log('REVIEWS_RECEIVED ' + JSON.stringify(action.reviews) + 'received from ' + action.hikeId)
      let updatedReviewMap = Object.assign({}, updated.reviewMap)
      let hikeReviews = (updatedReviewMap[action.hikeId]) ? Object.assign([], updatedReviewMap[action.hikeId]) : []

      // itterate through reviews received and populate the map
      action.reviews.forEach((review, i) => {
        hikeReviews.push(review)
      })

      updatedReviewMap[action.hikeId] = hikeReviews
      updated['reviewMap'] = updatedReviewMap
      return updated

    // User location gotten from browser -- not currently implemented
    case constants.USER_LOCATION_RECEIVED:
      // console.log('USER_LOCATION_RECEIVED ' + JSON.stringify(action.center))
      updated['center'] = action.center
      return updated

    default:
      return state
  }
}
