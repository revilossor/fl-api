const subGraph = require('./subGraph')

const getChildren = (graph, { current }) => graph.connections.reduce((ids, connection) =>
  connection.src.process === current && !ids.includes(connection.tgt.process)
    ? [ ...ids, connection.tgt.process ]
    : ids,
[]
)

const processScene = (graph, state) => {
  const scenePath = [ ...state.path, state.current ]
  return {
    graph: subGraph(graph, scenePath),
    children: [ 'startNode' ],
    state: {
      ...state,
      path: scenePath
    }
  }
}

// TODO this could be broken down a bit - it does more than get children, with the path and subgraph stuff...
const processEnd = (graph, state) => {
  if (state.path.length === 0) {
    return {
      graph,
      children: [],
      state
    }
  }
  const parentPath = [ ...state.path ]
  const [ parentSceneId ] = parentPath.splice(-1, 1)
  const parentGraph = subGraph(graph, parentPath)
  return {
    graph: parentGraph,
    children: getChildren(parentGraph, { ...state, current: parentSceneId }),
    state: {
      ...state,
      path: parentPath
    }
  }
}

const processNode = (graph, state) => ({
  graph,
  children: getChildren(graph, state),
  state
})

const getNodeType = (graph, { path, current }) => subGraph(graph, path).processes[current].component

module.exports = (graph, state) => {
  switch (getNodeType(graph, state)) {
    case 'scene': return processScene(graph, state)
    case 'end': return processEnd(graph, state)
    default: return processNode(graph, state)
  }
}
