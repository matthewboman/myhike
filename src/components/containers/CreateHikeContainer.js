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
    const mapContainer = <div style={{height: '90vh', width: '50vw'}}></div>

    return (
      <div className="create-hike">

        <div className="col-md-6">
          <section style={{height: '100%'}} className="map-section">
          <HikeMap
            mapContainer={mapContainer}
            />
          </section>
        </div>

        <div className="col-md-6">
          <CreateHike />
        </div>

      </div>
    )
  }
}

export default CreateHikeContainer
