const express = require('express')
const version = require('./routers/version')
const next = require('./routers/next')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use('/version', version)
app.use('/next', next)

module.exports = app
