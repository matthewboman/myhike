const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const controllers = require('../controllers')
const utils = require('../utils')

// Log user out, check if user is logged in
router.get('/:action', (req, res, next) => {
	const action = req.params.action

	if (action == 'logout'){
		req.session.reset()
		res.json({
			confirmation: 'success'
		})
	}

	if (action == 'currentuser') {
		controllers.account.currentUser(req)
			.then((result) => {
				res.json({
					confirmation: 'success',
					user: result
				})
			})
			.catch((err) => {
				res.json({
					confirmation: 'fail',
					message: err
				})
			})
	}
})

// Register and login new user
router.post('/register', (req, res, next) => {
	const credentials = req.body

	controllers.profile.create(credentials)
		.then((profile) => {
			const token = utils.JWT.sign({id: profile.id}, process.env.TOKEN_SECRET)
			req.session.token = token
			res.json({
				confirmation: 'success',
				profile: profile,
				token: token
			})
		})
		.catch((err) => {
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

router.post('/login', (req, res, next) => {
	const credentials = req.body

	controllers.profile.find({username: credentials.username}, true)
  	.then((profiles) => {
  		if (profiles.length == 0){
  			res.json({
  				confirmation: 'fail',
  				message: 'Profile not found.'
  			})
  			return
  		}
  		const profile = profiles[0]

  		if (bcrypt.compareSync(credentials.password, profile.password) == false){
  			res.json({
  				confirmation: 'fail',
  				message: 'Incorrect Password.'
  			})
  			return
  		}
  		const token = utils.JWT.sign({id: profile.id}, process.env.TOKEN_SECRET)
  		req.session.token = token
			req.session.user = profile.id
  		res.json({
  			confirmation: 'success',
  			profile: profile.summary(),
  			token: token
  		})
  	})
  	.catch((err) => {
  		res.json({
  			confirmation: 'fail',
  			message: err
  		})
  	})
})

module.exports = router
