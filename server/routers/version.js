const version = require('../../package').version
const router = require('express').Router()

router.route('/')
  .get((req, res) => {
    res.json({ version })
  })

module.exports = router
