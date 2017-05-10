import React, { Component } from 'react'
import { connect } from 'react-redux'

import { HikeMap } from '../common'
import { Navbar } from './'
import { HomePage } from '../Home'

class HomeContainer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {

    const mapContainer = <div style={{height: '90vh', width: '30vw'}}></div>

    return (
      <div>

        <div className="col-md-4">
          <section style={{height: '100%'}} className="map-section">
          <HikeMap
            mapContainer={mapContainer}
            />
          </section>
        </div>

        <div className="col-md-8">
          <HomePage />
        </div>

      </div>
    )
  }
}

export default HomeContainer
