const util = require('../util')

module.exports = (graph, state) => {
  const processed = util.children(graph, state)
  return {
    graph: processed.graph,
    state: {
      ...state,
      current: processed.children[0]
    }
  }
}
