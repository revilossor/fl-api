const handler = require('./end')

const graph = require('../../../../fixtures/simple_scene')

describe('traversal', () => {
  describe('if current node is the root end node', () => {
    const state = { current: 'endNode', path: [] }

    let updated

    beforeAll(() => {
      updated = handler(graph, state)
    })

    it('current is null', () => {
      expect(updated.current).toBeNull()
    })

    it('the path is an empty array ( like the input state )', () => {
      expect(updated.path).toEqual([])
    })

    it('no additional properties are added', () => {
      expect(Object.keys(updated)).toEqual(Object.keys(state))
    })
  })

  describe('if current node is the end node of a scene', () => {
    const state = { current: 'endNode', path: [ 'scene' ] }

    let updated

    beforeAll(() => {
      updated = handler(graph, state)
    })

    it('current is the parent scenes child node', () => {
      expect(updated.current).toBe('endNode')
    })

    it('the path is the path to the parent scene', () => {
      expect(updated.path).toEqual([])
    })

    it('no additional properties are added', () => {
      expect(Object.keys(updated)).toEqual(Object.keys(state))
    })
  })
})
