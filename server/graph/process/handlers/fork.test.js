const handler = require('./fork')

const graph = require('../../../../fixtures/fork_graph')

let updated

describe('traversal', () => {

  describe('if the fork node has one child', () => {

    beforeAll(() => {
      updated = handler(graph, { current: 'fork_one', path: [] })
    })

    it('the updated current is the next node', () => {
      expect(updated.current).toBe('fork_two')
    })

    it('the updated path is the input path', () => {
      expect(updated.path).toEqual([])
    })

  })

  describe('if the fork node has multiple children', () => {

    beforeAll(() => {
      updated = handler(graph, { current: 'fork_two', path: [] })
    })

    // TODO put expression support in for legacy graphs???
    it('the updated current is the first child ( since expressions are not supported... )', () => {
      expect(updated.current).toBe('talk_one')
    })

    it('the updated path is the input path', () => {
      expect(updated.path).toEqual([])
    })

  })

})
