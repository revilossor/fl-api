const mockGraphSchema = { mock: 'graph-schema' }
const mockStateSchema = { mock: 'state-schema' }
const mockRequestSchema = { mock: 'request-schema' }

let index

beforeAll(() => {
  jest.mock('./graph.json', () => mockGraphSchema)
  jest.mock('./request.json', () => mockRequestSchema)
  jest.mock('./state.json', () => mockStateSchema)
  index = require('./index')
})

it('exports the graph schema as "graph"', () => {
  expect(index.graph).toEqual(mockGraphSchema)
})

it('exports the request schema as "request"', () => {
  expect(index.request).toEqual(mockRequestSchema)
})

it('exports the state schema as "state"', () => {
  expect(index.state).toEqual(mockStateSchema)
})
