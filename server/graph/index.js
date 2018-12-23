const validate = require('../validate')

module.exports = {
  next: (graph, state = { current: 'startNode', path: [] }) => {
    if (!graph) { throw Error('no graph passed!') }
    validate.graph(graph).errors.forEach(error => { throw error })
    // TODO validate state...

    // TODO process once...

    return {
      graph,
      state
    }
  }
  /*
  response: (graph, state = { current: 'startNode', path: [] }) => {
    // TODO process till reach a response generating node...
  }
  */
}
