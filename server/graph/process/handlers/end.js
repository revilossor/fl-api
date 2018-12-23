const getChildren = require('../getChildren')
const getSubGraph = require('../getSubGraph')

module.exports = (graph, state) => {
  if (state.path.length === 0) {
    return {
      graph,
      state: {
        ...state,
        current: '' // TODO some sentinel value to signify ended?
      }
    }
  }
  const path = [ ...state.path ]
  const [ parent ] = path.splice(-1, 1)
  const scope = getSubGraph(graph, path)
  return {
    graph,
    state: {
      ...state,
      path,
      current: getChildren(scope, { ...state, current: parent })[0]
    }
  }
}
