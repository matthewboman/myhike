import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CreateHike, Map } from '../containers'
import { Navbar } from './'

class CreateContainer extends Component {
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
          <CreateHike />
        </div>

      </div>
    )
  }
}

export default CreateContainer
