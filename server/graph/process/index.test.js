const index = require('./index')

const linear = require('../../../fixtures/linear_graph')
const branching = require('../../../fixtures/branching_graph')
const scene = require('../../../fixtures/simple_scene')
const deep = require('../../../fixtures/nested_scene')

it('returns the ids of child nodes', () => {
  expect(index(linear, { current: 'startNode', path: [] })).toEqual(expect.objectContaining({
    children: ['one']
  }))
})

it('returns multiple ids, if there are multiple index', () => {
  expect(index(branching, { current: 'a', path: [] })).toEqual(expect.objectContaining({
    children: ['b', 'c']
  }))
})

describe('if there are multiple connections to the same child', () => {
  const dupe = { ...linear }

  beforeAll(() => {
    dupe.connections.push({
      src: { process: 'startNode', port: 'out' },
      tgt: { process: 'one', port: 'in' }
    })
  })

  it('that child id will only appear once in the index array', () => {
    expect(index(dupe, { current: 'startNode', path: [] })).toEqual(expect.objectContaining({
      children: [ 'one' ]
    }))
  })
})

describe('if the node is a scene', () => {
  let struct

  const path = []

  beforeAll(() => {
    struct = index(scene, { current: 'scene', path })
  })

  it('the index will be the scenes startNode', () => {
    expect(struct.children).toEqual(['startNode'])
  })

  it('the path will have the scene id appended to it', () => {
    expect(struct.state.path).toEqual(['scene'])
  })

  it('the graph will be the scenes subGraph', () => {
    expect(struct.graph).toEqual(scene.processes.scene.metadata.subGraph)
  })

  it('does not mutate the path', () => {
    expect(path).toEqual([])
  })
})

describe('if the node is an exitNode within a scene', () => {
  let struct

  const path = ['scene_one', 'scene_two', 'scene_three']

  beforeAll(() => {
    struct = index(deep, { current: 'endNode', path })
  })

  it('the index will be the parent scenes index', () => {
    expect(struct.children).toEqual(['endNode'])
  })

  it('the path will be the path to the parent scene', () => {
    expect(struct.state.path).toEqual(['scene_one', 'scene_two'])
  })

  it('the graph will be the parent graph containing the parent scene', () => {
    expect(struct.graph).toEqual(deep.processes.scene_one.metadata.subGraph.processes.scene_two.metadata.subGraph)
  })

  it('does not mutate the path', () => {
    expect(path).toEqual(['scene_one', 'scene_two', 'scene_three'])
  })
})

describe('if the node has no index', () => {
  let struct

  const path = []

  beforeAll(() => {
    struct = index(linear, { current: 'endNode', path })
  })

  it('the index will be an empty array', () => {
    expect(struct.children).toEqual([])
  })

  it('the path will be the path passed in', () => {
    expect(struct.state.path).toEqual(path)
  })

  it('the graph will be the graph passed in', () => {
    expect(struct.graph).toEqual(linear)
  })
})