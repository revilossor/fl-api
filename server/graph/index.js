const process = require('./process')

module.exports = {
  next: (graph, state = { current: 'startNode', path: [] }) => {
    if (!graph) { throw Error('no graph passed!') }
    return process(graph, state)
  }
  /*
  response: (graph, state = { current: 'startNode', path: [] }) => {
    // TODO process till reach a response generating node...
  }
  */
}
