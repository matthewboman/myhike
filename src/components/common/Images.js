import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

/*
  TODO: Right now, every image is sent to Cloudinary before the user clicks
    "submit images," so potentially a lot of bullshit is being posted.
    There's a commented-out example below the code that might allow the images
    to display on the page before being sent off

  TODO: move photo/API logic to ImageUploader

*/

class Images extends Component {
  constructor() {
    super()
    this.state = {
      images: [],
    }
  }

  uploadFile(files) {
    const image = files[0]
    // Prepare request for Cloudinary
    const cloudName = "dotkbdwdw"
    const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
    const timestamp = Date.now() / 1000
    const uploadPreset = 'me0nxa6b'
    const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'i3ngvXSllacuFCrG_SCVwbfa1WI'
    const signature = sha1(paramsStr)
    const params = {
      'api_key': '614624198613471',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }
    // Make the request
    let uploadRequest = superagent.post(url)
    uploadRequest.attach('file', image)

    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key])
    })

    uploadRequest.end((err, res) => {
      if (err) {
        callback(err, null)
        return
      }
      // Set state with what I get back from Cloudinary
      let updatedImages = Object.assign([], this.state.images)
      updatedImages.push(res.body)
      this.setState({
        images: updatedImages
      })
    })
  }

  removeImage(event) {
    event.preventDefault()

    let updatedImages = Object.assign([], this.state.images)
    updatedImages.splice(event.target.id, 1)

    this.setState({
      images: updatedImages
    })
  }

  submitImages(event) {
    this.props.onImageSubmit(this.state.images)
  }

  renderPictures() {
    return this.state.images.map((image, i) => {
      return (
        <li key={i} className="image-list-preview">
          <div className="parent">
            <img src={image.secure_url} className="image-preview"/>
            <button className="close" onClick={this.removeImage.bind(this)}>X</button>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <ul className="hike-images">
        <li className="image-list-preview">
          <Dropzone
            className="image-drop"
            onDrop={this.uploadFile.bind(this)}
            multiple={false}
            accept="image/*">
            <p className="image-drop-text">Upload image</p>
          </Dropzone>
        </li>
        {this.renderPictures()}
        </ul>
        <button onClick={this.submitImages.bind(this)}
          className="btn image-submit-btn">Submit Images</button>
      </div>
    )
  }
}


// === Here's how I might do this without sending everything to cloudinary ====
/*
class Images extends Component {
  constructor() {
    super()
    this.state = {
      images: [],
      file: '',
      imagePreviewUrl: ''
    }
  }


  previewImage(files) {
    const image = files[0]
    let reader = new FileReader();

    // let updatedImages = Object.assign([], this.state.images)
    // updatedImages.push(uploaded)
    //
    // this.setState({
    //   images: updatedImages
    // })

    reader.onloadend = () => {
      this.setState({
        file: image,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(image)

    // console.log('uploadFile: '+ JSON.stringify(files))
    // // select first image
    // const image = files[0]
    // // ========= prepare request for cloudinary ============
    // const cloudName = "dotkbdwdw" // /console - cloud name
    // const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
    // const timestamp = Date.now() / 1000
    // const uploadPreset = 'me0nxa6b'
    // const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'i3ngvXSllacuFCrG_SCVwbfa1WI'
    // const signature = sha1(paramsStr)
    // const params = {
    //   'api_key': '614624198613471',
    //   'timestamp': timestamp,
    //   'upload_preset': uploadPreset,
    //   'signature': signature
    // }
    // // ======== make the request ============
    // let uploadRequest = superagent.post(url)
    // uploadRequest.attach('file', image)
    //
    // Object.keys(params).forEach((key) => {
    //   uploadRequest.field(key, params[key])
    // })
    //
    // uploadRequest.end((err, res) => {
    //   if (err) {
    //     callback(err, null)
    //     return
    //   }
    //   console.log('UPLOAD COMPLETE: ' + JSON.stringify(res.body))
    //   const uploaded = res.body
    //
    //   let updatedImages = Object.assign([], this.state.images)
    //   updatedImages.push(uploaded)
    //
    //   this.setState({
    //     images: updatedImages
    //   })
    // })
  }

  removeImage(event) {
    event.preventDefault()
    console.log(event.target.id)

    let updatedImages = Object.assign([], this.state.images)
    updatedImages.splice(event.target.id, 1)

    this.setState({
      images: updatedImages
    })
  }

  render() {
    const pixx = this.state.images.map((image, i) => {
      return (
        <li key={i} className="image-list-preview">
          <img src={image.secure_url} className="image-preview"/>
          <br />
          <a id={i}
             onClick={this.removeImage.bind(this)}
             href="#"
             className="remove-image">
             Remove
          </a>
        </li>
      )
    })

     let {imagePreviewUrl} = this.state;
     let $imagePreview = null;
     if (imagePreviewUrl) {
       $imagePreview = (<img src={imagePreviewUrl} />);
     } else {
       $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
     }


     return (
       <div>
         <Dropzone
           className="image-drop"
           onDrop={this.previewImage.bind(this)}
           multiple={false}
           accept="image/*">
           <p className="image-drop-text">Upload image</p>
         </Dropzone>
         {$imagePreview}
       </div>
     )
    // return (
    //   <div>
    //     <Dropzone
    //       className="image-drop"
    //       onDrop={this.uploadFile.bind(this)}
    //       multiple={false}
    //       accept="image/*">
    //       <p className="image-drop-text">Upload image</p>
    //     </Dropzone>
    //     {pixx}
    //   </div>
    // )
  }
}
*/

export default Images
