import React, { Component } from 'react'

import { Images } from '../presentation'

class CreateHike extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const currentReview = this.props.currentReview

    return (
      <div className="review-block">
        <h4 className="review-header">Review/description: </h4>
        <p className="review-description">
          {currentReview.description}
        </p>
        <h4 className="review-header">Animals spotted: </h4>
        <p className="review-animals">
          {currentReview.animals}
        </p>
        <h4 className="review-header">Plants identified: </h4>
        <p className="review-plants">
          {currentReview.plants}
        </p>
        <h4 className="review-header">Mushrooms and other fungi: </h4>
        <p className="review-fungi">
          {currentReview.fungi}
        </p>
      </div>
    )
  }
}

export default CreateHike
