const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')
const getResponse = require('../helpers/getResponse')

module.exports = (graph, state) => {
  if (state.path.length === 0) {
    return { ...state, current: null, complete: true }
  }
  const path = [ ...state.path ]
  const [ parent ] = path.splice(-1, 1)
  const scope = getSubGraph(graph, path)
  const current = getChildren(scope, { ...state, current: parent })[0]
  const node = scope.processes[current]

  const response = getResponse(node, state)

  return {
    ...state,
    ...response,
    path,
    current
  }
}
