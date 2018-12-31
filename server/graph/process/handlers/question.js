const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')
const getResponse = require('../helpers/getResponse')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  const node = scope.processes[state.current]

  let current = node.metadata.defaultOption
  children.forEach(id => {
    const utterances = scope.processes[id].metadata.utterances.split('\n')
    if (utterances.includes(state.utterance)) {
      current = id
    }
  })

  const next = scope.processes[current]
  const response = getResponse(next, state)
  
  return {
    ...state,
    ...response,
    utterance: undefined,
    current
  }
}
