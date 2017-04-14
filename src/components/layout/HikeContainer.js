import React, { Component } from 'react'

import { Hike, Map } from '../containers'
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
        <section style={{height: '100%'}} className="map-section">
        <Map
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
