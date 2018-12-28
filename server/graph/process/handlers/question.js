const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')

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

  let selectedChild = node.metadata.defaultOption
  children.forEach(id => {
    const utterances = scope.processes[id].metadata.utterances.split('\n')
    if (utterances.includes(state.utterance)) {
      selectedChild = id
    }
  })

  return {
    ...state,
    utterance: undefined,
    current: selectedChild,
    text,
    audio,
    repromptAudio: node.metadata.repromptAudio,
    repromptText: node.metadata.repromptText
  }
}
