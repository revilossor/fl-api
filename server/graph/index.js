const process = require('./process')

module.exports = {
  next: (graph, state = { current: 'startNode', path: [] }) => {
    if (!graph) { throw Error('no graph passed!') }
    return process(graph, state)
  },
  lines: (graph, state = { current: 'startNode', path: [] }) => {
    if (!graph) { throw Error('no graph passed!') }
    let updated = process(graph, state)
    while (updated.complete === false) {
      updated = process(graph, updated)
    }
    return updated
  }
}
