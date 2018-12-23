const handle = require('./handlers')

const getSubGraph = require('./getSubGraph')
const getNodeType = (graph, { path, current }) => getSubGraph(graph, path).processes[current].component

module.exports = (graph, state) => handle[getNodeType(graph, state)]
