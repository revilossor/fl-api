const mockGraphSchema = { mock: 'graph-schema' }
const mockRequestSchema = { mock: 'request-schema' }

let index

beforeAll(() => {
  jest.mock('./graph.json', () => mockGraphSchema)
  jest.mock('./request.json', () => mockRequestSchema)
  index = require('./index')
})

it('exports the graph schema as "graph"', () => {
  expect(index.graph).toEqual(mockGraphSchema)
})

it('exports the request schema as "request"', () => {
  expect(index.request).toEqual(mockRequestSchema)
})
