"use strict";

module.exports = {

  thumbnail: function (url, dimensions) {
    console.log(url);
    var thumbParams = "upload/c_thumb,h_" + dimensions + ",w_" + dimensions + ",x_0,y_0";
    return url.replace("upload", thumbParams);
  },

  profile: function (url, w) {
    var profileParams = "upload/w_" + w + ",c_scale";
    return url.replace("upload", profileParams);
  },

  preview: function (url, h, w) {
    var previewParams = "upload/c_thumb,h_" + h + ",w_" + w + ",x_0,y_0";
    return url.replace("upload", previewParams);
  } }
/*
* scaling with Cloudinary
*
* thumnail:
*
*
* scale and keep aspect ratio:
*    http://res.cloudinary.com/demo/image/upload/w_150,c_scale/sample.jpg
*/
;