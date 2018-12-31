const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')
const getResponse = require('../helpers/getResponse')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  const node = scope.processes[state.current]

  const { stateKey, defaultOption } = node.metadata

  let current = defaultOption
  children.forEach(id => {
    if (scope.processes[id].metadata.value === state[stateKey]) {
      current = id
    }
  })

  const response = getResponse(scope.processes[current], state)

  return {
    ...state,
    ...response,
    current
  }
}
