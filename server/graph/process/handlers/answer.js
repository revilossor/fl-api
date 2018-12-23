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

  return { ...state, current: children[0], text, audio }
}
