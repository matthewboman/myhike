import React, { Component } from 'react'
import { Link } from 'react-router'
import Lightbox from 'react-image-lightbox'

import { Images } from '../common'
import { ImageHelper } from '../../utils'
import { DifficultySelect, FeatureSelect } from './'

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      review: props.review,
      images: [],
      isOpen: false,
      photoIndex: 0,

    }
  }

  componentDidMount() {
    this.createImageList()
  }

  createImageList() {
    this.setState({ images: this.props.review.pictures })
  }

  toggleEdit(event) {
    event.preventDefault()
    this.setState({ isEditing: !this.state.isEditing })
  }

  updateReview(event) {
    let updatedReview = Object.assign({}, this.state.review)
    let value = (!event.target.value) ? event.target.defaultValue : event.target.value
    updatedReview[event.target.id] = value
    this.setState({ review: updatedReview })
  }

  submitUpdate(event) {
    event.preventDefault()
    this.props.onUpdate(this.state.review)
    this.setState({ isEditing: !this.state.isEditing })
  }

  displayPicture() {
    this.setState({ isOpen: true })
  }

  updateDifficulty(value) {
    let updatedReview = Object.assign({}, this.state.review)
    updatedReview['difficulty'] = value
    this.setState({ review: updatedReview})
  }

  updateFeatures(value) {
    let updatedReview = Object.assign({}, this.state.review)
    let updatedFeatures = Object.assign([], this.state.review.features)
    updatedFeatures = value.split(',')
    updatedReview['features'] = updatedFeatures
    this.setState({ review: updatedReview})
  }

  renderLightBox() {
    return (
      <Lightbox
          mainSrc={this.state.images[this.state.photoIndex]}
          nextSrc={this.state.images[(this.state.photoIndex + 1) % this.state.images.length]}
          prevSrc={this.state.images[(this.state.photoIndex + this.state.images.length - 1) % this.state.images.length]}

          onCloseRequest={() => this.setState({ isOpen: false })}
          onMovePrevRequest={() => this.setState({
              photoIndex: (this.state.photoIndex + this.state.images.length - 1) % this.state.images.length,
          })}
          onMoveNextRequest={() => this.setState({
              photoIndex: (this.state.photoIndex + 1) % this.state.images.length,
          })}
      />
    )
  }


  renderPhotos() {
    return this.props.review.pictures.map((picture, id) => {
      return (
        <img key={id}
          className="hike-review-photo"
          src={ImageHelper.preview(picture, 150, 200)}
          onClick={this.displayPicture.bind(this)}/>
      )
    })
  }

  renderDescription() {
    return (
      <div className="review-description-block">
        <div className="review-header">Review/description: </div>
        <div className="review-text">{this.props.review.description}</div>
      </div>
    )
  }

  renderDifficulty() {
    console.log(this.props.review.difficulty)
    return (
      <div className="review-difficulty-block">
        <div className="review-header difficulty-header">Difficulty: </div>
        <div className="review-text difficulty-text">{this.props.review.difficulty}</div>
      </div>
    )
  }

  renderFeatures() {
    return this.props.review.features.map((feature, id) => {
      return (
        <span key={id} className="review-feature">{feature}, </span>
      )
    })
  }

  renderAnimals() {
    return (
      <div className="review-animals-block">
        <div className="review-header">Animals: </div>
        <div className="review-text">{this.props.review.animals}</div>
      </div>
    )
  }

  renderPlants() {
    return (
      <div className="review-plants-block">
        <div className="review-header">Plants: </div>
        <div className="review-text">{this.props.review.plants}</div>
      </div>
    )
  }

  renderFungi() {
    return (
      <div className="review-fungi-block">
        <div className="review-header">Fungi: </div>
        <div className="review-text">{this.props.review.fungi}</div>
      </div>
    )
  }

  renderUser() {
    return (
      <div className="review-user-block">
        <img className="icon-image"
              src={ImageHelper.thumbnail((this.props.review.user.image) ? this.props.review.user.image : "/images/default-user-sm.png", 40)} />
        <span>
          <Link to={"../profile/" + this.props.review.user.id}>{this.props.review.user.username}</Link>
        </span>
        <span> | </span>
        <span>{this.props.review.timestamp.slice(0, this.props.review.timestamp.indexOf("T"))}</span>
      </div>
    )
  }

  renderReview() {
    return (
      <div className="review-block">
        {(this.props.displayName) ? this.renderHikeName() : ''}

        <div className="hike-review-photos">
          {this.renderPhotos()}
        </div>

        {(this.props.review.description) ? this.renderDescription() : ''}
        {(this.props.review.difficulty) ? this.renderDifficulty() : ''}

        <div className="review-feature-block">
          <div className="review-header">Features: </div>
          {this.renderFeatures()}
        </div>

        {(this.props.review.animals) ? this.renderAnimals(): ''}
        {(this.props.review.plants) ? this.renderPlants() : ''}
        {(this.props.review.fungi) ? this.renderFungi() : ''}
        {this.renderUser()}
        {
          ((this.props.isEditable) ? this.props.isEditable : false) ?
            <button className="button-default review-edit-button" onClick={this.toggleEdit.bind(this)}>Edit Review</button> : null
        }
      </div>
    )
  }

  renderEditableReview() {
    return (
      <div className="review-block editable-review">
        <div className="review-header">Review/description: </div>
        <textarea
          id="description"
          className="form-control"
          onChange={this.updateReview.bind(this)}
          defaultValue={this.props.review.description} />

        <div className="review-header">Difficulty: </div>
        <DifficultySelect addDifficultyToHike={this.updateDifficulty.bind(this)} />

        <div className="review-header">Features: </div>
        <FeatureSelect addFeaturesToHike={this.updateFeatures.bind(this)}/>

        <div className="review-header">Animals spotted: </div>
        <input
          id="animals"
          className="form-control"
          onChange={this.updateReview.bind(this)}
          defaultValue={this.props.review.animals} />
        <div className="review-header">Plants identified: </div>
        <input
          id="plants"
          className="form-control"
          onChange={this.updateReview.bind(this)}
          defaultValue={this.props.review.plants} />
        <div className="review-header">Mushrooms and other fungi: </div>
        <input
          id="fungi"
          className="form-control"
          onChange={this.updateReview.bind(this)}
          defaultValue={this.props.review.fungi} />
        <br />
        <button className="btn review-edit-button" onClick={this.submitUpdate.bind(this)}>Update Review</button>
      </div>
    )
  }

  renderHikeName() {
    return (
      <div className="hike-name">
        <Link to={`../hike/${this.props.review.hikeId}`} >
          {this.props.review.hikeName}
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div>
        {(this.state.isOpen) ? this.renderLightBox() : ''}
        {(this.state.isEditing) ? this.renderEditableReview() : this.renderReview()}
      </div>
    )
  }
}

export default Review
