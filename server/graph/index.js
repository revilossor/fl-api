const validate = require('../validate')

module.exports = {
  next: (graph, state = { current: 'startNode', path: [] }) => {
    if (!graph) { throw Error('no graph passed!') }
    validate.graph(graph).errors.forEach(error => { throw error })

    // TODO call the correct handler...

    return {
      graph,
      state
    }
  }
}

// calls each of the handlers in turn, until a response node is reached.
// returns story, state, response,
