import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CreateHike } from '../CreateHike'
import { HikeMap } from '../common'
import { Navbar } from './'

class CreateHikeContainer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const mapContainer = <div style={{height: '80vh', width: '30vw'}}></div>

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
          <CreateHike />
        </div>

      </div>
    )
  }
}

export default CreateHikeContainer
