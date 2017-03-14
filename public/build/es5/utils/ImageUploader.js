"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var sha1 = _interopRequire(require("sha1"));

var APIManager = require("./").APIManager;


/*
 Universal image processor for uploading images to Cloudinary
*/

module.exports = {

  upload: function (image) {
    // Prep Coudinary
    var cloudName = "dotkbdwdw";
    var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
    // Prep PARAMS
    var upload_preset = "me0nxa6b";
    var API_Secret = "i3ngvXSllacuFCrG_SCVwbfa1WI";
    var timestamp = Date.now() / 1000; // they want seconds, not miliseconds
    var paramsStr = "timestamp=" + timestamp + "&upload_preset=" + upload_preset + API_Secret;
    var signature = sha1(paramsStr);

    var params = {
      api_key: "614624198613471",
      timestamp: timestamp,
      upload_preset: upload_preset,
      signature: signature
    };
    // Upload image to Cloudinary
    APIManager.upload(url, image, params, function (err, response) {
      if (err) {
        console.error(err);
        return;
      }
      // let updatedProfile = Object.assign({}, this.props.user)
      // updatedProfile['image'] = response.body['secure_url']
      // this.setState({
      //   updated: updatedProfile
      // })
      var imageUrl = response.body.secure_url;
      return imageUrl;
    });
  }

};