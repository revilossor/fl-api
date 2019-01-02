module.exports = (node, state) => {   // TODO reprompt...
  const reset = node.component === 'answer' // TODO use state.complete for this???

  const text = reset
    ? []
    : state.text ? [ ...state.text ] : []

  if (node.metadata.text) {
    text.push(node.metadata.text)
  }

  const audio = reset
    ? []
    : state.audio ? [ ...state.audio ] : []

  if (node.metadata.audio) {
    audio.push(node.metadata.audio)
  }

  const complete = node.component === 'question'

  return { ...state, text, audio, complete }
}
