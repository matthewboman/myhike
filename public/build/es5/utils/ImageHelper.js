"use strict";

module.exports = {

  thumbnail: function (url, dimensions) {
    console.log(url);
    var thumbParams = "upload/c_thumb,h_" + dimensions + ",w_" + dimensions + ",x_0,y_0";
    return url.replace("upload", thumbParams);
  },

  profile: function (url, h, w) {
    var profileParams = "upload/c_scale,h_" + h + ",w_" + w;
    return url.replace("upload", profileParams);
  },

  preview: function (url, h, w) {
    var previewParams = "upload/c_thumb,h_" + h + ",w_" + w + ",x_0,y_0";
    return url.replace("upload", previewParams);
  }

};