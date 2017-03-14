import React, { Component } from 'react'

import { Hike, Map } from '../containers'
import { Navbar }from './'

class HikeContainer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const mapContainer = <div style={{height: 500, width: 400}}></div>

    return (
      <div>

        <div className="col-md-4">
          <Map
            mapContainer={mapContainer}
            />
        </div>

        <div className="col-md-8">
          <Hike />
        </div>

      </div>
    )
  }
}

export default HikeContainer
