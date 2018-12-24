const handler = require('./decision')

const graph = require('../../../../fixtures/node_types')
const state = { current: 'decision', path: [] }

let updated

describe('traversal', () => {
  it('goes to the child branch node with value matching state value for state key', () => {
    updated = handler(graph, { ...state, answer: 'two' })
    expect(updated.current).toBe('branch_two')
  })

  it('if no child branch with matching state value, goes to default', () => {
    updated = handler(graph, { ...state, answer: 'two' })
    expect(updated.current).toBe('branch_two')
  })

  it('if the stateKey in the node is undefined in state, goes to default', () => {
    updated = handler(graph, state)
    expect(updated.current).toBe('branch_one')
  })
})

it('no other properties are added to the state', () => {
  expect(Object.keys(state)).toEqual(Object.keys(updated))
})
