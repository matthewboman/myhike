const superagent = require('superagent')

module.exports = {

  get: (url, params, callback) => {
    superagent
      .get(url)
      .query(params)
      .set('Accept', 'text/json')
      .end((err, response) => {
        if (err) {
          callback(err, null)
          return
        }
        callback(null, response.body)
      })
  }
}
