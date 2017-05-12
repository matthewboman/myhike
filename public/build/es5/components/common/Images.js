"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Dropzone = _interopRequire(require("react-dropzone"));

var sha1 = _interopRequire(require("sha1"));

var superagent = _interopRequire(require("superagent"));

/*
  TODO: Right now, every image is sent to Cloudinary before the user clicks
    "submit images," so potentially a lot of bullshit is being posted.
    There's a commented-out example below the code that might allow the images
    to display on the page before being sent off

  TODO: move photo/API logic to ImageUploader

*/

var Images = (function (Component) {
  function Images() {
    _classCallCheck(this, Images);

    _get(Object.getPrototypeOf(Images.prototype), "constructor", this).call(this);
    this.state = {
      images: [] };
  }

  _inherits(Images, Component);

  _prototypeProperties(Images, null, {
    uploadFile: {
      value: function uploadFile(files) {
        var _this = this;
        // Select first image
        var image = files[0];
        // Prepare request for Cloudinary
        var cloudName = "dotkbdwdw";
        var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
        var timestamp = Date.now() / 1000;
        var uploadPreset = "me0nxa6b";
        var paramsStr = "timestamp=" + timestamp + "&upload_preset=" + uploadPreset + "i3ngvXSllacuFCrG_SCVwbfa1WI";
        var signature = sha1(paramsStr);
        var params = {
          api_key: "614624198613471",
          timestamp: timestamp,
          upload_preset: uploadPreset,
          signature: signature
        };
        // Make the request
        var uploadRequest = superagent.post(url);
        uploadRequest.attach("file", image);

        Object.keys(params).forEach(function (key) {
          uploadRequest.field(key, params[key]);
        });

        uploadRequest.end(function (err, res) {
          if (err) {
            callback(err, null);
            return;
          }
          var uploaded = res.body;

          // Set state with what I get back from Cloudinary
          var updatedImages = Object.assign([], _this.state.images);
          updatedImages.push(uploaded);

          _this.setState({
            images: updatedImages
          });
        });
      },
      writable: true,
      configurable: true
    },
    removeImage: {
      value: function removeImage(event) {
        event.preventDefault();

        var updatedImages = Object.assign([], this.state.images);
        updatedImages.splice(event.target.id, 1);

        this.setState({
          images: updatedImages
        });
      },
      writable: true,
      configurable: true
    },
    submitImages: {
      value: function submitImages(event) {
        this.props.onImageSubmit(this.state.images);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        var pixx = this.state.images.map(function (image, i) {
          return React.createElement(
            "li",
            { key: i, className: "image-list-preview" },
            React.createElement(
              "div",
              { className: "parent" },
              React.createElement("img", { src: image.secure_url, className: "image-preview" }),
              React.createElement(
                "button",
                { className: "close", onClick: _this.removeImage.bind(_this) },
                "X"
              )
            )
          );
        });

        return React.createElement(
          "div",
          null,
          React.createElement(
            "ul",
            { className: "hike-images" },
            React.createElement(
              "li",
              { className: "image-list-preview" },
              React.createElement(
                Dropzone,
                {
                  className: "image-drop",
                  onDrop: this.uploadFile.bind(this),
                  multiple: false,
                  accept: "image/*" },
                React.createElement(
                  "p",
                  { className: "image-drop-text" },
                  "Upload image"
                )
              )
            ),
            pixx
          ),
          React.createElement(
            "button",
            { onClick: this.submitImages.bind(this),
              className: "btn image-submit-btn" },
            "Submit Images"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Images;
})(Component);




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

module.exports = Images;