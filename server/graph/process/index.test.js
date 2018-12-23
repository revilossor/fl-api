const index = require('./index')

// const linear = require('../../../fixtures/linear_graph')
// const branching = require('../../../fixtures/branching_graph')
const scene = require('../../../fixtures/simple_scene')
const deep = require('../../../fixtures/nested_scene')

describe.skip('if the node is a scene', () => {
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

describe.skip('if the node is an exitNode within a scene', () => {
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
