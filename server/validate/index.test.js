const graphSchema = require('./graph-schema')

const mockValidateResult = 'mockValidateResult'
const mockValidate = jest.fn(() => mockValidateResult)

let graph

beforeAll(() => {
  jest.mock('jsonschema', () => ({
    validate: mockValidate
  }))
  graph = require('./index').graph
})

afterEach(() => {
  mockValidate.mockClear()
})

describe('graph', () => {
  const someGraph = { the: 'moon' }
  let result

  beforeAll(() => {
    result = graph(someGraph)
  })

  it('uses the graph schema to validate the argument', () => {
    expect(mockValidate).toHaveBeenCalledWith(someGraph, graphSchema)
  })

  it('returns the result from the validator', () => {
    expect(result).toBe(mockValidateResult)
  })
})
