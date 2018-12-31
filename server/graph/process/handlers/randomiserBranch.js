const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  return { ...state, current: children[0], complete: false }
}
