var Promise = require('bluebird');

var ProfileController = require('./ProfileController');
var utils = require('../utils')

module.exports = {

  // Check for current user
  currentUser: function(req) {
    return new Promise(function(resolve, reject) {
      // no session
      if (req.session == null) {
        resolve(null)
        console.log('no session')
        return
      }

      // session w/o user (good for shopping carts, tracking user on site)
      if (req.session.user == null) {
        console.log('no user')
        resolve(null)
        return
      }

  		var token = req.session.token
  		utils.JWT.verify(token, process.env.TOKEN_SECRET)
    		.then(function(decode){
    			return ProfileController.findById(decode.id)
    		})
    		.then(function(profile){
          resolve(profile)
    		})
    		.catch(function(err){
    			reject(err)
    			return
    		})


    })
  },

}
