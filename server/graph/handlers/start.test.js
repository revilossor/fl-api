const start = require('./start')
const graph = require('../../../fixtures/linear_graph')
const state = { current: 'startNode', path: [] }

describe('returned struct', () => {
  let struct

  beforeAll(() => {
    struct = start(graph, state)
  })

  it('graph is the input graph', () => {
    expect(struct.graph).toEqual(graph)
  })

  describe('state', () => {
    it('current is the node after the startNode', () => {
      expect(struct.state.current).toEqual('one')
    })

    it('path is the input path', () => {
      expect(struct.state.path).toEqual(state.path)
    })

    it('no other properties are added', () => {
      expect(Object.keys(struct.state)).toEqual([
        'current',
        'path'
      ])
    })
  })
})
