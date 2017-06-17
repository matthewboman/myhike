var express = require('express')
var router = express.Router()
var bcrypt = require('bcryptjs')

var controllers = require('../controllers')
var utils = require('../utils')

/*
TODO: Move password logic to profile or account controller so that this
			handles only routing.
*/

// Log user out, check if user is logged in
router.get('/:action', function(req, res, next){
	var action = req.params.action

	if (action == 'logout'){ // log out
		req.session.reset()
		res.json({
			confirmation: 'success'
		})
	}

	if (action == 'currentuser') {
		controllers.account.currentUser(req)
			.then(function(result) {
				console.log(result)
				res.json({
					confirmation: 'success',
					user: result
				})
			})
			.catch(function(err) {
				console.log(err)
				res.json({
					confirmation: 'fail',
					message: err
				})
			})
	}

})

// Register and login new user
router.post('/register', function(req, res, next){
	var credentials = req.body

	controllers.profile.create(credentials)
		.then(function(profile){
			// create signed token
			var token = utils.JWT.sign({id: profile.id}, process.env.TOKEN_SECRET)
			req.session.token = token

			res.json({
				confirmation: 'success',
				profile: profile,
				token: token
			})
		})
		.catch(function(err){
			let errors = []
			// If username is taken
			if (err.errors.username) {
				errors.push(err.errors.username.message)
			}
			// If email is taken
			if (err.errors.email) {
				errors.push(err.errors.email.message)
			}
			// Other errors
			if (!err.errors.username || !err.errors.email) {
				errors.push(err)
			}
			res.json({
				confirmation: 'fail',
				message: errors
			})
		})
})

// Login returning user
router.post('/login', function(req, res, next){
	var credentials = req.body

	controllers.profile.find({username: credentials.username}, true)
  	.then(function(profiles){
  		if (profiles.length == 0){
  			res.json({
  				confirmation: 'fail',
  				message: 'Profile not found.'
  			})
  			return
  		}

  		var profile = profiles[0]
  		var passwordCorrect = bcrypt.compareSync(credentials.password, profile.password)
  		if (passwordCorrect == false){
  			res.json({
  				confirmation: 'fail',
  				message: 'Incorrect Password.'
  			})
  			return
  		}

  		// create signed token
  		var token = utils.JWT.sign({id: profile.id}, process.env.TOKEN_SECRET)
  		req.session.token = token
			req.session.user = profile.id
  		res.json({
  			confirmation: 'success',
  			profile: profile.summary(),
  			token: token
  		})
  	})
  	.catch(function(err){
  		res.json({
  			confirmation: 'fail',
  			message: err
  		})
  	})
})

module.exports = router
