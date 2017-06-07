import React, { Component } from 'react'
import { Link } from 'react-router'
import Modal from 'react-modal'

import { Images } from '../common'
import { ImageHelper } from '../../utils'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      review: props.review,
      currentPicture: '',
      modalIsOpen: false,
    },
    this.closeModal = this.closeModal.bind(this)
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

  displayPicture(event, picture, id) {
    console.log(event)
    // BUG: for some reason picture is the first and not second argument?
    this.setState({
      currentPicture: event,
      modalIsOpen: true,
    })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  renderPhotos() {
    return this.props.review.pictures.map((picture, id) => {
      return (
        <img key={id}
          className="hike-review-photo"
          src={ImageHelper.preview(picture, 150, 200)}
          onClick={this.displayPicture.bind(this, picture, id)}/>
      )
    })
  }

  renderReview() {
    return (
      <div className="review-block">
        <div className="hike-review-photos">
          {this.renderPhotos()}
        </div>
        <div className="review-header">Review/description: </div>
        <p className="review-description">
          {this.props.review.description}
        </p>
        <div className="review-header">Animals spotted: </div>
        <p className="review-animals">
          {this.props.review.animals}
        </p>
        <div className="review-header">Plants identified: </div>
        <p className="review-plants">
          {this.props.review.plants}
        </p>
        <div className="review-header">Mushrooms and other fungi: </div>
        <p className="review-fungi">
          {this.props.review.fungi}
        </p>
        <img className="icon-image"
              src={ImageHelper.thumbnail((this.props.review.user.image) ? this.props.review.user.image : "/images/default-user-sm.png", 40)} />
        <span>
          <Link to={"../profile/" + this.props.review.user.id}>{this.props.review.user.username}</Link>
        </span>
        <span> | </span>
        <span>{this.props.review.timestamp.slice(0, this.props.review.timestamp.indexOf("T"))}</span>
        {
          ((this.props.isEditable) ? this.props.isEditable : false) ?
            <button className="btn review-edit-button" onClick={this.toggleEdit.bind(this)}>Edit Review</button> : null
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

  render() {
    return (
      <div>
        {(this.state.isEditing) ? this.renderEditableReview() : this.renderReview()}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Picture Modal" >
          <button className="x-button" onClick={this.closeModal}>X</button>
          <img src={this.state.currentPicture} className="large-review-image"/>
        </Modal>
      </div>
    )
  }
}

export default Review
