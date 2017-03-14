import sha1 from 'sha1'
import { APIManager } from './'

/*
 Universal image processor for uploading images to Cloudinary
*/

export default {

  upload: (image) => {
    // Prep Coudinary
    const cloudName = 'dotkbdwdw'
    const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
    // Prep PARAMS
    const upload_preset = 'me0nxa6b'
    const API_Secret = 'i3ngvXSllacuFCrG_SCVwbfa1WI'
    let timestamp = Date.now() / 1000 // they want seconds, not miliseconds
    const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + upload_preset + API_Secret
    const signature = sha1(paramsStr)

    const params = {
      'api_key': '614624198613471',
      'timestamp':  timestamp,
      'upload_preset': upload_preset,
      'signature': signature
    }
    // Upload image to Cloudinary
    APIManager.upload(url, image, params, (err, response) => {
      if (err) {
        console.error(err)
        return
      }
      // let updatedProfile = Object.assign({}, this.props.user)
      // updatedProfile['image'] = response.body['secure_url']
      // this.setState({
      //   updated: updatedProfile
      // })
      const imageUrl = response.body['secure_url']
      return imageUrl
    })
  }

}
