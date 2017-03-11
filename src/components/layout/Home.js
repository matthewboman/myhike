import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Map, CreateHike, Account } from '../containers'
import { Nav }from './'


class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {

    const mapContainer = <div style={{height: 500, width: 400}}></div>

    return (
      <div>

        <div className="nav">
          <Account />
        </div>

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

export default Home
