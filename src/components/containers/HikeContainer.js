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
    const mapContainer = <div style={{height: '90vh', width: '30vw'}}></div>

    return (
      <div>

      <div className="col-md-4">
        <section className="map-section">
        <HikeMap
          mapContainer={mapContainer}
          />
        </section>
      </div>

        <div className="col-md-8">
          <Hike />
        </div>

      </div>
    )
  }
}

export default HikeContainer
