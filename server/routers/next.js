const router = require('express').Router()
const validate = require('../validate')
const graph = require('../graph')

// TODO route for graphid, gets from store. if also graph in body, use that instead.
router.route('/')
  .post((req, res, next) => {
    const { errors } = validate.request(req.body)
    errors.length > 0
      ? next(errors)
      : res.json(graph.next(req.body.graph, req.body.node, req.body.state))
  })

module.exports = router
