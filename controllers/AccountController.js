const Promise = require('bluebird');
const ProfileController = require('./ProfileController');
const utils = require('../utils')

module.exports = {

  currentUser: (req) => {
    return new Promise((resolve, reject) => {
      if (req.session == null) {
        resolve(null)
        return
      }
      // session w/o user (good for shopping carts, tracking user on site)
      if (req.session.user == null) {
        resolve(null)
        return
      }
  		const token = req.session.token
  		utils.JWT.verify(token, process.env.TOKEN_SECRET)
    		.then((decode) => {
    			return ProfileController.findById(decode.id)
    		})
    		.then((profile) => {
          resolve(profile)
    		})
    		.catch((err) =>{
    			reject(err)
    			return
    		})
    })
  },

}
