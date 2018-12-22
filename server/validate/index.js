const { validate, Validator } = require('jsonschema')
const { graph, state, request } = require('./schema')

const requestValidator = new Validator()
requestValidator.addSchema(graph, '/Graph')
requestValidator.addSchema(state, '/State')

module.exports = {
  graph: item => validate(item, graph),
  request: item => requestValidator.validate(item, request)
}
