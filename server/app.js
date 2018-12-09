const express = require('express')
const version = require('./routers/version')

const app = express()

app.use('/version', version)

module.exports = app
