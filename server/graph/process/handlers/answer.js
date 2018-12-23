const getChildren = require('../getChildren')
const getSubGraph = require('../getSubGraph')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)
  const node = scope.processes[state.current]

  const text = state.text ? [ ...state.text ] : []
  if (node.metadata.text) {
    text.push(node.metadata.text)
  }

  const audio = state.audio ? [ ...state.audio ] : []
  if (node.metadata.audio) {
    audio.push(node.metadata.audio)
  }

  const { stateKey, stateValue, operation } = node.metadata
  const operationState = {}

  if (operation) {
    let value = state[stateKey]
      ? operation.includes('crement')
        ? typeof (state[stateKey]) === 'string'
          ? 0
          : state[stateKey]
        : state[stateKey]
      : operation.includes('crement')
        ? 0
        : ''

    switch (operation) {
      case 'assign':
        value = stateValue
        break
      case 'append':
        value = `${value}${stateValue}`
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

  return { ...state, current: children[0], text, audio, ...operationState }
}
