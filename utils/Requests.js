var superagent = require('superagent')

module.exports = {

  get: function(url, params, callback) {
    superagent
      .get(url)
      .query(params)
      .set('Accept', 'text/json')
      .end(function(err, response) {
        if (err) {
          callback(err, null)
          return
        }
        callback(null, response.body)
      })
  }
}
