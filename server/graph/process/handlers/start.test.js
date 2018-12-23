const handler = require('./start')

const graph = require('../../../../fixtures/simple_scene')
const state = { current: 'startNode', path: [] }

let updated

describe('traversal', () => {

  beforeAll(() => {
    updated = handler(graph, state)
  })

  it('the updated current is the next node', () => {
    expect(updated.current).toBe('scene')
  })

  it('the updated path is the input path', () => {
    expect(updated.path).toEqual([])
  })

  it('no additional properties are added', () => {
    expect(Object.keys(updated)).toEqual(Object.keys(state))
  })

})
