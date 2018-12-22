const util = require('../util')

module.exports = (graph, node, state, path) => {
  const processed = util.children(graph, node, path)
  return {
    graph: processed.graph,
    node: processed.children[0],
    path: processed.path,
    state
  }
}
