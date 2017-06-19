import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'
import { HikeMap } from '../common'
import { Navbar } from './'
import { HomePage } from '../Home'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  searchByDifficulty(term) {
    this.props.searchReviews('difficulty', term.value, null)
  }

  searchByFeatures(features, mustIncludeAll) {
    let featureList = features.split(',')
    this.props.searchReviews('features', featureList, mustIncludeAll)
  }

  searchByField(field, term) {
    this.props.searchReviews(field, term, null)
  }

  render() {

    const mapContainer = <div style={{height: '90vh', width: '50vw'}}></div>

    return (
      <div className="homepage">

        <div className="col-sm-12 col-md-6">
          <section style={{height: '100%'}} className="map-section">
          <HikeMap
            mapContainer={mapContainer}
            />
          </section>
        </div>

        <div className="col-sm-12 col-md-6">
          <HomePage
            searchByDifficulty={this.searchByDifficulty.bind(this)}
            searchByFeatures={this.searchByFeatures.bind(this)}
            searchByField={this.searchByField.bind(this)}
            searchResults={this.props.searchResults} />
        </div>

      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    searchResults: state.review.searchResults,
  }
}

const dispatchToProps = (dispatch) => {
  return {
    searchReviews: (field, term, includeAll) => dispatch(actions.searchReviews(field, term, includeAll)),
  }
}

export default connect(stateToProps, dispatchToProps)(HomeContainer)
