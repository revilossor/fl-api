module.exports = (graph, path) => path.reduce(
  (scope, id) => scope.processes[id].metadata.subGraph,
  graph
)
