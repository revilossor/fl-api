const process = require('../process')

module.exports = (graph, state) => {
  const processed = process(graph, state)
  return {
    graph: processed.graph,
    state: {
      ...state,
      current: processed.children[0]
    }
  }
}
