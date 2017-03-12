"use strict";

module.exports = {

  thumbnail: function (url, dimensions) {
    var thumbParams = "upload/c_thumb,h_" + dimensions + ",w_" + dimensions + ",x_0,y_0";
    return url.replace("upload", thumbParams);
  } };