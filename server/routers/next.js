const router = require('express').Router()

const required = ['story', 'state', 'current']
// IDEA extract this to validation module
const validate = (body, required) => required.reduce((errors, property) =>
  body[property]
    ? errors
    : [ ...errors, `missing "${property}" property in request` ]
, [])

router.route('/')
  .post((req, res) => {
    const errors = validate(req.body, required)
    errors.length > 0
      ? res.status(400).json({ errors })
      : res.json(req.body)
  })

module.exports = router
