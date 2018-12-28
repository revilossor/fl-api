const getChildren = require('./getChildren')

const linear = require('../../../../fixtures/linear_graph')
const branching = require('../../../../fixtures/branching_graph')
const types = require('../../../../fixtures/node_types')

it('returns the ids of child nodes', () => {
  const state = { current: 'startNode', path: [] }
  expect(getChildren(linear, state)).toEqual(['one'])
})

it('returns multiple ids, if there are multiple children', () => {
  const state = { current: 'a', path: [] }
  expect(getChildren(branching, state)).toEqual(['b', 'c'])
})

it('gets children from the optional type port', () => {
  const state = { current: 'shuffleAndTake', path: [] }
  expect(getChildren(types, state, 'finally')).toEqual(['talk_shuffle_two'])
})

describe('if there are multiple connections to the same child', () => {
  const dupe = { ...linear }

  beforeAll(() => {
    dupe.connections.push({
      src: { process: 'startNode', port: 'out' },
      tgt: { process: 'one', port: 'in' }
    })
  })

  it('that child will only appear once', () => {
    const state = { current: 'startNode', path: [] }
    expect(getChildren(dupe, state)).toEqual([ 'one' ])
  })
})

it('if the node has no children, returns empty list', () => {
  const state = { current: 'endNode', path: [] }
  expect(getChildren(linear, state)).toEqual([])
})
