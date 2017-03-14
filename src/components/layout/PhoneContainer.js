import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Map } from '../containers'

/*
NOT CURRENTLY IMPLEMENTED
*/


class Container extends Component {
  constructor() {
    super()
    this.state = {
      // height: (window.innerHeight-50),
      height: (window.innerWidth),
      width: (window.innerWidth)
    }

  }


  render() {
    const mapContainer = <div style={{height: this.state.height, width: this.state.width}}></div>

    return (
      <div>

        <div className="nav">
          <Nav />
        </div>

        <div className="row small-map"><div className="col-xs-12">
          <Map
          mapContainer={mapContainer}
            />
        </div></div>

        <div className="row"><div className="col-xs-12">
          {this.props.children}
        </div></div>

      </div>
    )
  }
}

export default Container
