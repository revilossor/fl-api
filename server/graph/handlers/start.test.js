const start = require('./start')
const graph = require('../../../fixtures/linear_graph')
const node = 'startNode'
const state = { the: 'moon' }
const path = []

describe('returned struct', () => {
  let struct

  beforeAll(() => {
    struct = start(graph, node, state, path)
  })

  it('graph is the input graph', () => {
    expect(struct.graph).toEqual(graph)
  })

  it('node is the single node after the startNode', () => {
    expect(struct.node).toEqual('one')
  })

  it('state is the input state', () => {
    expect(struct.state).toEqual(state)
  })

  it('path is the input path', () => {
    expect(struct.path).toEqual(path)
  })
})
