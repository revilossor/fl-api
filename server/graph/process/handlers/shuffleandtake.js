const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')
const getRandom = require('../helpers/getRandom')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const taken = state.taken ? [ ...state.taken ] : []

  const children = getChildren(scope, state).filter(id => !taken.includes(id))

  if (children.length === 0) {
    delete state.taken
    return { ...state, current: getChildren(scope, state, 'finally')[0] }
  }

  const map = new Map()
  children.forEach(child => {
    map.set(child, 1)
  })
  const current = getRandom(map)

  return { ...state, current, taken: [ ...taken, current ] }
}
