const sceneGraph = require('../../../fixtures/simple_scene')
const nestedSceneGraph = require('../../../fixtures/nested_scene')
const subGraph = require('./subgraph')

it('gets the sub scene at the path one scene deep', () => {
  const expectedSubGraph = sceneGraph.processes.scene.metadata.subGraph
  const path = ['scene']

  expect(subGraph(sceneGraph, path)).toEqual(expectedSubGraph)
})

it('gets the sub scene at the path three scenes deep', () => {
  const expectedSubGraph =
    nestedSceneGraph.processes.scene_one.metadata.subGraph.processes
      .scene_two.metadata.subGraph.processes.scene_three.metadata.subGraph
  const path = ['scene_one', 'scene_two', 'scene_three']

  expect(subGraph(nestedSceneGraph, path)).toEqual(expectedSubGraph)
})
