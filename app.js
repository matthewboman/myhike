const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const sessions = require('client-sessions')
require('dotenv').config()

/* My routes */
const account = require('./routes/account')
const api = require('./routes/api')
const routes = require('./routes/index')
const search = require('./routes/search')

/* Initialize database */
mongoose.connect(process.env.DB_URL, (err, res) => {
  if (err) {
    console.log('DB Connection failed: '+ err)
  } else {
    console.log('DB Connection Success')
  }
})

// Start app
const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sessions({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  duration: 24*60*60*1000,
  activeDuration: 30*60*1000
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname + '/public'))
app.use('/api', api)
app.use('/account', account)
app.use('/search', search)
app.use('/', routes)

/* Error handling */
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
