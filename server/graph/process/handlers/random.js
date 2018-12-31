const getChildren = require('../helpers/getChildren')
const getSubGraph = require('../helpers/getSubGraph')
const getRandom = require('../helpers/getRandom')
const getResponse = require('../helpers/getResponse')

module.exports = (graph, state) => {
  const scope = getSubGraph(graph, state.path)
  const children = getChildren(scope, state)

  const map = new Map()
  children.forEach(child => {
    map.set(child, parseFloat(scope.processes[child].metadata.weight))
  })

  const current = getRandom(map)
  const node = scope.processes[current]

  const response = getResponse(node, state)

  return { ...state, ...response, current }
}
