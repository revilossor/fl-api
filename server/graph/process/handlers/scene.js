module.exports = (graph, state) => ({
  graph,
  state: {
    ...state,
    path: [ ...state.path, state.current ],
    current: 'startNode'
  }
})
