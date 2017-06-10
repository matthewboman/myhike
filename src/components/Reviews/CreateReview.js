import React, { Component } from 'react'

import { Images } from '../common'
import { DifficultySelect, FeatureSelect } from './'

class CreateReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      review: {
        animals: '',
        description: '',
        difficulty: '',
        fungi: '',
        features: [],
        pictures: [],
        plants: '',
        user: props.user,
        hikeId: props.hike.id,
        userId: props.user.id,
        hikeName: props.hike.name
      }
    }
  }

  componentDidMount() {
    console.log(JSON.stringify(this.props, null, 2))
  }

  updateHike(event) {
    let updatedReview = Object.assign({}, this.state.review)
    updatedReview[event.target.id] = event.target.value
    this.setState({
      review: updatedReview
    })
  }

  addImages(event) {
    let updatedReview = Object.assign({}, this.state.review)
    let updatedImages = Object.assign([], this.state.review.pictures)
    for (let value of event) {
      updatedImages.push(value.secure_url)
    }
    updatedReview["pictures"] = updatedImages
    this.setState({ review: updatedReview })
  }

  submitHike(review) {
    event.preventDefault()
    this.props.onReview(this.state.review)
  }

  addDifficultyToHike(value) {
    let updatedReview = Object.assign({}, this.state.review)
    updatedReview['difficulty'] = value
    this.setState({ review: updatedReview})
  }

  addFeaturesToHike(value) {
    let updatedReview = Object.assign({}, this.state.review)
    let updatedFeatures = Object.assign([], this.state.review.features)
    updatedFeatures = value.split(',')
    updatedReview['features'] = updatedFeatures
    this.setState({ review: updatedReview})
  }

  render() {
    return (
      <div className="review-block">
        <div className="review-header">Add your own review</div>
        <div className="review-input description-input">
          <textarea onChange={this.updateHike.bind(this)} id="description"
            className="form-control" type="text" placeholder="Describe it!" />
        </div>
        <div className="review-input difficulty-select">
          <DifficultySelect addDifficultyToHike={this.addDifficultyToHike.bind(this)} />
        </div>
        <div className="review-input feature-select">
          <FeatureSelect addFeaturesToHike={this.addFeaturesToHike.bind(this)}/>
        </div>
        <div className="review-input plant-input">
        <input onChange={this.updateHike.bind(this)} id="plants"
          className="form-control" type="text" placeholder="What plants?" />
        </div>
        <div className="review-input fungi-input">
          <input onChange={this.updateHike.bind(this)} id="fungi"
            className="form-control" type="text" placeholder="What mushrooms?" />
        </div>
        <div className="review-input animals-input">
          <input onChange={this.updateHike.bind(this)} id="animals"
            className="form-control" type="text" placeholder="What animals" />
        </div>
        <div className="review-input review-image-input">
          <Images onImageSubmit={this.addImages.bind(this)}/>
        </div>
        <button onClick={this.submitHike.bind(this)}
          className="btn add-review-btn">Add it</button>
      </div>
    )
  }
}

export default CreateReview
