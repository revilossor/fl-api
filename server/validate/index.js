const { validate } = require('jsonschema')
const graphSchema = require('./graph-schema')

module.exports = {
  graph: item => validate(item, graphSchema)
}
