const getChildren = require('../getChildren')
const getSubGraph = require('../getSubGraph')

module.exports = (graph, state) => {
  if (state.path.length === 0) {
    return { ...state, current: null }
  }
  const path = [ ...state.path ]
  const [ parent ] = path.splice(-1, 1)
  const scope = getSubGraph(graph, path)
  return {
    ...state,
    path,
    current: getChildren(scope, { ...state, current: parent })[0]
  }
}
