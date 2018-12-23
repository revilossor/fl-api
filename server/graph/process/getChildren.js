module.exports = (graph, { current }) => graph.connections.reduce((ids, connection) =>
  connection.src.process === current && !ids.includes(connection.tgt.process)
    ? [ ...ids, connection.tgt.process ]
    : ids,
[]
)
