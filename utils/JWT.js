const jwt = require('jsonwebtoken')
const Promise = require('bluebird')

module.exports = {

	sign: (obj, secret) => {
		return jwt.sign(obj, secret) // return token
	},

	verify: (token, secret) => {
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, (err, decode) => {
				if (err){
					reject(err)
					return
				}
				resolve(decode)
			})
		})
	},

}
