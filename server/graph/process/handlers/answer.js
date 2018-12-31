const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')
const getResponse = require('../helpers/getResponse')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  const node = scope.processes[state.current]
  const next = scope.processes[children[0]]

  const response = getResponse(next, state)

  const { stateKey, stateValue, operation } = node.metadata
  const operationState = {}

  if (operation) {
    let value = state[stateKey] // sorry, CBA
      ? operation.includes('crement')
        ? typeof (state[stateKey]) === 'string'
          ? 0
          : state[stateKey]
        : state[stateKey]
      : operation.includes('crement')
        ? 0
        : ''

    switch (operation) {
      case 'append':
        value = `${value}${stateValue}`
        break
      case 'assign':
        value = stateValue
        break
      case 'increment':
        value += stateValue
        break
      case 'decrement':
        value -= stateValue
        break
    }

    operationState[stateKey] = value
  }

  return {
    ...state,
    ...response,
    current: children[0],
    ...operationState
  }
}
