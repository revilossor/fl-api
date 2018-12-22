const subGraph = require('./subGraph')

const getChildren = (graph, node) => graph.connections.reduce((ids, connection) =>
  connection.src.process === node && !ids.includes(connection.tgt.process)
    ? [ ...ids, connection.tgt.process ]
    : ids,
[]
)

const processScene = (graph, node, path) => {
  const scenePath = [...path, node]
  return {
    graph: subGraph(graph, scenePath),
    children: [ 'startNode' ],
    path: scenePath
  }
}

const processEnd = (graph, node, path) => {
  if (path.length === 0) {
    return {
      graph,
      children: [],
      path
    }
  }
  const parentPath = [ ...path ]
  const [ parentSceneId ] = parentPath.splice(-1, 1)
  const parentGraph = subGraph(graph, parentPath)
  return {
    graph: parentGraph,
    children: getChildren(parentGraph, parentSceneId),
    path: parentPath
  }
}

const processNode = (graph, node, path) => ({
  graph,
  children: getChildren(graph, node),
  path
})

const getNodeType = (graph, node, path) => subGraph(graph, path).processes[node].component

module.exports = (graph, node, path) => {
  switch (getNodeType(graph, node, path)) {
    case 'scene': return processScene(graph, node, path)
    case 'end': return processEnd(graph, node, path)
    default: return processNode(graph, node, path)
  }
}
