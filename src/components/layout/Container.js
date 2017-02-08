import React, { Component } from 'react'
import { Resizable, ResizableBox } from 'react-resizable';
import { connect } from 'react-redux'

import { Map } from '../containers'
import { Nav }from './'


class Container extends Component {
  constructor() {
    super()
    this.state = {
      // height: window.innerHeight-70,
      // leftWidth: (window.innerWidth/2),
      // rightWidth: (window.innerWidth/2),
      height: (Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-70),
      leftWidth: (Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/2),
      rightWidth: (Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/2),
    }
  }

  onResize(event, {element, size}){
    this.setState({
      leftWidth: size.width,
      rightWidth: (window.innerWidth-size.width)
    })
    // console.log('Width of left component is ' + this.state.leftWidth + 'px')
    // console.log('Width of right component is ' + this.state.rightWidth + 'px')
  }

  render() {
    const mapContainer = <div style={{height: this.state.height, width: this.state.leftWidth}}></div>

    return (
      <div>

        <div className="nav">
          <Nav />
        </div>

        <ResizableBox className="left"
          width={this.state.leftWidth} height={this.state.height}
          axis={'x'}
          onResize={this.onResize.bind(this)}>
          <Map
            mapContainer={mapContainer}
            />
        </ResizableBox>

        <ResizableBox className="right"
          width={this.state.rightWidth} height={this.state.height}
          axis={'x'}>
          {this.props.children}
        </ResizableBox>

      </div>
    )
  }
}

export default Container
