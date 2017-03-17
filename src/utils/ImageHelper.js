export default {

  thumbnail: (url, dimensions) => {
    console.log(url)
    let thumbParams = 'upload/c_thumb,h_' + dimensions + ',w_' + dimensions + ',x_0,y_0'
    return url.replace('upload', thumbParams)
  },

  profile: (url, h, w) => {
    let profileParams = 'upload/c_scale,h_' + h + ',w_' + w
    return url.replace('upload', profileParams)
  },

  preview: (url, h, w) => {
    let previewParams = 'upload/c_thumb,h_' + h + ',w_' + w + ',x_0,y_0'
    return url.replace('upload', previewParams)
  }

}
