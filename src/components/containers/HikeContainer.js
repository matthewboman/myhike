import React, { Component } from 'react'

import { Hike } from '../Hike'
import { HikeMap } from '../common'
import { Navbar }from './'

class HikeContainer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const mapContainer = <div style={{height: '90vh', width: '50vw'}}></div>

    return (
      <div className="hike-component-container">

      <div className="col-md-6">
        <section className="map-section">
        <HikeMap
          mapContainer={mapContainer}
          />
        </section>
      </div>

        <div className="col-md-6">
          <Hike />
        </div>

      </div>
    )
  }
}

export default HikeContainer
