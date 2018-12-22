const validate = require('../validate')

module.exports = {
  next: (graph, node = 'startNode', state = {}) => {
    if(!graph) { throw Error('no graph passed!') }
    validate.graph(graph).errors.forEach(error => { throw error })
  }
}

// calls each of the handlers in turn, until a response node is reached.
// returns story, state, response,
