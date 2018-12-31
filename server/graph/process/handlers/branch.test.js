const handler = require('./branch')

const graph = require('../../../../fixtures/node_types')
const state = { current: 'branch_one', path: [] }

let updated

describe('traversal', () => {
  beforeAll(() => {
    updated = handler(graph, state)
  })

  it('the updated current is the next node', () => {
    expect(updated.current).toBe('shuffleAndTake')
  })

  it('the updated path is the input path', () => {
    expect(updated.path).toEqual([])
  })
})
