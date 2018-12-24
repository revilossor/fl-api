const getChildren = require('../getChildren')
const getSubGraph = require('../getSubGraph')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  const node = scope.processes[state.current]

  const { stateKey, defaultOption } = node.metadata

  let selectedChild = defaultOption
  children.forEach(id => {
    if (scope.processes[id].metadata.value === state[stateKey]) {
      selectedChild = id
    }
  })

  return { ...state, current: selectedChild }
}
