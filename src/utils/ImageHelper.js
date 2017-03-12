export default {

  thumbnail: (url, dimensions) => {
    let thumbParams = 'upload/c_thumb,h_' + dimensions + ',w_' + dimensions + ',x_0,y_0'
    return url.replace('upload', thumbParams)
  },
  
}
