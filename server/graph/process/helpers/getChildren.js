module.exports = (graph, { current }, port = 'out') => graph.connections.reduce((ids, connection) =>
  connection.src.process === current &&
  connection.src.port === port &&
  !ids.includes(connection.tgt.process)
    ? [ ...ids, connection.tgt.process ]
    : ids,
[]
)
