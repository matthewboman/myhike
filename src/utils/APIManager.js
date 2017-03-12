import superagent from 'superagent'

export default {

  // GET shit from DB
  get: (endpoint, params, callback) => {
    superagent
      .get(endpoint)
      .query(params)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          callback(err, null)
          return
        }

  			const confirmation = response.body.confirmation
  			if (confirmation != 'success'){
  				callback({message: response.body.message}, null)
  				return
  			}

  			callback(null, response.body)
      })
  },

  // POST shit to DB
  post: (endpoint, params, callback) => {
		superagent
  		.post(endpoint)
  		.send(params)
  		.set('Accept', 'application/json')
  		.end((err, response) => {
  			if (err){
  				callback(err, null)
  				return
  			}

  			const confirmation = response.body.confirmation
  			if (confirmation != 'success'){
  				callback({message: response.body.message}, null)
  				return
  			}

  			callback(null, response.body)
  		})
	},

  // UPDATE shit in the database
  put: (endpoint, params, callback) => {
    superagent
  		.put(endpoint)
  		.send(params)
  		.set('Accept', 'application/json')
  		.end((err, response) => {
  			if (err){
  				callback(err, null)
  				return
  			}

  			const confirmation = response.body.confirmation
  			if (confirmation != 'success'){
  				callback({message: response.body.message}, null)
  				return
  			}

  			callback(null, response.body)
  		})
  },

  // DELETE that shit
  delete: () => {

  },

  /* Upload image - set up for Cloudinary*/
  upload: (endpoint, file, params, callback) => {
    let uploadRequest = superagent.post(endpoint)

    uploadRequest.attach('file', file) // 'file' is a Cloudinary requirement
    // Add other parameters
    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key])
    })

    uploadRequest.end((err, response) => {
      if (err) {
        callback(err, null)
        return
      }
      callback(null, response)
    })
  },

}
