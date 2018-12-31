const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  const node = scope.processes[state.current]
  const next = scope.processes[children[0]]

  const text = state.text ? [ ...state.text ] : []
  if (next.metadata.text) {
    text.push(next.metadata.text)
  }

  const audio = state.audio ? [ ...state.audio ] : []
  if (next.metadata.audio) {
    audio.push(next.metadata.audio)
  }

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
    current: children[0],
    text,
    audio,
    ...operationState,
    complete: false
  }
}
