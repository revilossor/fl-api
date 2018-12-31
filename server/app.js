const express = require('express')
const version = require('./routers/version')
const next = require('./routers/next')
const lines = require('./routers/lines')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use('/version', version)
app.use('/next', next)
app.use('/lines', lines)

module.exports = app
