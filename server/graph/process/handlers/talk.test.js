const handler = require('./talk')

const graph = require('../../../../fixtures/node_types')
const state = { current: 'talk_one', path: [] }

let updated

describe('traversal', () => {
  beforeAll(() => {
    updated = handler(graph, state)
  })

  it('the updated current is the next node', () => {
    expect(updated.current).toBe('question')
  })

  it('the updated path is the input path', () => {
    expect(updated.path).toEqual([])
  })
})
