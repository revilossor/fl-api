module.exports = (node, state) => {
  const text = state.text ? [ ...state.text ] : []

  if (node.metadata.text) {
    text.push(node.metadata.text)
  }

  const audio = state.audio ? [ ...state.audio ] : []

  if (node.metadata.audio) {
    audio.push(node.metadata.audio)
  }

  const complete = node.component === 'question'

  return { ...state, text, audio, complete }
}
