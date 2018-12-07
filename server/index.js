const express = require('express')
const fs = require('fs')

const app = express()

const routers = fs.readDirSync('./routers').filter(filename => !filename.includes('.test.js'))

routers.forEach(router => {
  app.use(`/${router}`, require(router))
})

app.listen(process.env.PORT || 8080)
