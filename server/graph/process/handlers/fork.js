const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')
const getResponse = require('../helpers/getResponse')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  const current = children[0]
  const node = scope.processes[current]
  const response = getResponse(node, state)

  return { ...state, ...response, current }
}
