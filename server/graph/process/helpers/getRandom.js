module.exports = tuples => {
  if (!(tuples instanceof Map)) {
    throw Error('[getRandom] argument should be a map of item:weight pairs!')
  }

  if (tuples.size === 0) {
    throw Error('[getRandom] the map argument should have some values!')
  }

  const weights = Array.from(tuples.values())

  if (weights.some(weight => typeof (weight) !== 'number')) {
    throw Error('[getRandom] the values of the argument map should all be numbers!')
  }

  if (tuples.size === 1) {
    return tuples.keys().next().value
  }

  const totalWeight = weights.reduce((total, weight) => total + weight, 0)

  const ranges = new Map()
  let threshold = 0
  tuples.forEach((weight, item) => { // TODO keep this in closure???
    threshold += weight / totalWeight
    ranges.set(item, threshold.toFixed(4)) // round to 4dp cos javascript. wat.
  })

  const rnd = Math.random()

  if (rnd === 1) { // this will favour the last element in the map slightly...
    return Array.from(tuples.keys())[tuples.size - 1]
  }

  const entries = ranges.entries()

  for (let entry of entries) {
    if (rnd < entry[1]) {
      return entry[0]
    }
  }
}
