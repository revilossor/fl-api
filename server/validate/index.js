const { validate, Validator } = require('jsonschema')
const { graph, request } = require('./schema')

const requestValidator = new Validator()
requestValidator.addSchema(graph, '/Graph')

module.exports = {
  graph: item => validate(item, graph),
  request: item => requestValidator.validate(item, request)
}
