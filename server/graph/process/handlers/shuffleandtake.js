const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')
const getRandom = require('../helpers/getRandom')
const getResponse = require('../helpers/getResponse')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const taken = state.taken ? [ ...state.taken ] : []

  const children = getChildren(scope, state).filter(id => !taken.includes(id))

  if (children.length === 0) {
    delete state.taken
    const current = getChildren(scope, state, 'finally')[0]
    const node = scope.processes[current]
    const response = getResponse(node, state)

    return { ...state, ...response, current }
  }

  const map = new Map()
  children.forEach(child => {
    map.set(child, 1)
  })
  const current = getRandom(map)
  const node = scope.processes[current]
  const response = getResponse(node, state)

  return { ...state, ...response, current, taken: [ ...taken, current ] }
}
