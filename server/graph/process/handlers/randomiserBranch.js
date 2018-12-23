const getChildren = require('../getChildren')
const getSubGraph = require('../getSubGraph')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  return { ...state, current: children[0] }
}
