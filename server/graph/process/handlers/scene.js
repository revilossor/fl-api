module.exports = (graph, state) => ({
  ...state,
  path: [ ...state.path, state.current ],
  current: 'startNode',
  complete: false
})
