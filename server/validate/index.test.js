const jsonschema = require('jsonschema')
const schema = require('./schema')

const mockValidateResult = 'some validation result'
const someGraph = { processes: {}, connections: [] }
const someRequest = {
  graph: someGraph,
  node: 'startNode',
  state: {}
}

let graph
let request

let addSchema
let validate

let result

beforeAll(() => {
  jest.spyOn(jsonschema, 'validate')
  addSchema = jest.spyOn(jsonschema.Validator.prototype, 'addSchema')
  validate = jest.spyOn(jsonschema.Validator.prototype, 'validate')
  const index = require('./index')
  graph = index.graph
  request = index.request
})

describe('graph', () => {
  beforeAll(() => {
    jsonschema.validate.mockReturnValueOnce(mockValidateResult)
    result = graph(someGraph)
  })

  it('uses the graph schema to validate the argument', () => {
    expect(jsonschema.validate).toHaveBeenCalledWith(someGraph, schema.graph)
  })

  it('returns the result from the validator', () => {
    expect(result).toBe(mockValidateResult)
  })
})

describe('request', () => {
  beforeAll(() => {
    validate.mockReturnValueOnce(mockValidateResult)
    result = request(someRequest)
  })

  it('adds the referenced "/Graph" schema to the request schema', () => {
    expect(addSchema).toHaveBeenCalledWith(schema.graph, '/Graph')
  })

  it('adds the referenced "/State" schema to the request schema', () => {
    expect(addSchema).toHaveBeenCalledWith(schema.state, '/State')
  })

  it('uses the request schema to validate the argument', () => {
    expect(validate).toHaveBeenCalledWith(someRequest, schema.request)
  })

  it('returns the result from the validator', () => {
    expect(result).toBe(mockValidateResult)
  })
})
