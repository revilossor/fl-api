const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')

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
  const text = []
  if (next.metadata.text) {
    text.push(next.metadata.text)
  }

  const audio = []
  if (next.metadata.audio) {
    audio.push(next.metadata.audio)
  }

  return {
    ...state,
    utterance: undefined,
    current,
    text,
    audio,
    complete: true
  }
}
