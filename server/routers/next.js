const router = require('express').Router()
const validate = require('../validate')
const graph = require('../graph')

router.route('/')
  .post((req, res, next) => {
    const { errors } = validate.request(req.body)
    errors.length > 0
      ? next(errors)
      : res.json({ ...req.body, state: graph.next(req.body.graph, req.body.state) })
  })

module.exports = router
