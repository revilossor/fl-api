const express = require('express')
const version = require('./routers/version')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use('/version', version)

module.exports = app
