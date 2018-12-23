const handler = require('./scene')

const graph = require('../../../../fixtures/simple_scene')
const state = { current: 'scene', path: [] }

let updated

describe('traversal', () => {

  beforeAll(() => {
    updated = handler(graph, state)
  })

  it('the updated current is the start node of the scene', () => {
    expect(updated.current).toBe('startNode')
  })

  it('the updated path is the input path, with the scene id appended', () => {
    expect(updated.path).toEqual([ 'scene' ])
  })

  it('no additional properties are added', () => {
    expect(Object.keys(updated)).toEqual(Object.keys(state))
  })

})
