const handler = require('./answer')

const graph = require('../../../../fixtures/node_types')

const state = { current: 'answer_one', path: [] }

let updated

// TODO guess this should remove question reprompt stuff from the state...

describe('traversal', () => {
  beforeAll(() => {
    updated = handler(graph, state)
  })

  it('the updated current is the next child', () => {
    expect(updated.current).toBe('random')
  })

  it('the updated path is the input path', () => {
    expect(updated.path).toEqual([])
  })
})

describe('text', () => {
  const stateWithText = { ...state, text: ['sometext'] }

  describe('if there is text in the next node', () => {
    const textGraph = JSON.parse(JSON.stringify(graph))
    const value = 'some other text'

    beforeAll(() => {
      textGraph.processes.random.metadata.text = value
    })

    it('if there is text in state, node text is appended to it', () => {
      updated = handler(textGraph, stateWithText)
      expect(updated.text).toEqual([
        ...stateWithText.text,
        value
      ])
    })

    it('if there is no text in state, its created containing node text', () => {
      updated = handler(textGraph, state)
      expect(updated.text).toEqual([
        value
      ])
    })
  })

  describe('if there is no text in the next node', () => {
    it('if there is text in state, it remains the same', () => {
      updated = handler(graph, stateWithText)
      expect(updated.text).toEqual(stateWithText.text)
    })

    it('if there is no text in state, its created empty', () => {
      updated = handler(graph, state)
      expect(updated.text).toEqual([])
    })
  })
})

describe('audio', () => {
  const stateWithAudio = { ...state, audio: ['someaudio'] }

  describe('if there is audio in the next node', () => {
    const audioGraph = JSON.parse(JSON.stringify(graph))
    const value = 'some other audio'

    beforeAll(() => {
      audioGraph.processes.random.metadata.audio = value
    })

    it('if there is audio in state, node audio is appended to it', () => {
      updated = handler(audioGraph, stateWithAudio)
      expect(updated.audio).toEqual([
        ...stateWithAudio.audio,
        value
      ])
    })

    it('if there is no audio in state, its created containing node audio', () => {
      updated = handler(audioGraph, state)
      expect(updated.audio).toEqual([
        value
      ])
    })
  })

  describe('if there is no audio in the next node', () => {
    it('if there is audio in state, it remains the same', () => {
      updated = handler(graph, stateWithAudio)
      expect(updated.audio).toEqual(stateWithAudio.audio)
    })

    it('if there is no audio in state, its created empty', () => {
      updated = handler(graph, state)
      expect(updated.audio).toEqual([])
    })
  })
})
describe('state operations', () => {
  const stateWithKey = { ...state, answer: 'initial value' }
  const stateWithNumberKey = { ...state, answer: 10 }

  const noopGraph = JSON.parse(JSON.stringify(graph))
  const appendGraph = JSON.parse(JSON.stringify(graph))
  const incrementGraph = JSON.parse(JSON.stringify(graph))
  const decrementGraph = JSON.parse(JSON.stringify(graph))

  noopGraph.processes.answer_one.metadata.operation = undefined
  appendGraph.processes.answer_one.metadata.operation = 'append'
  incrementGraph.processes.answer_one.metadata.operation = 'increment'
  decrementGraph.processes.answer_one.metadata.operation = 'decrement'

  incrementGraph.processes.answer_one.metadata.stateValue = 5
  decrementGraph.processes.answer_one.metadata.stateValue = 5

  // TODO if key and value are missing? cant use falsy for value cos might be 0 ...
  it('if there is no operation, nothing happens', () => {
    updated = handler(noopGraph, stateWithKey)
    expect(updated.answer).toBe('initial value')
    updated = handler(noopGraph, state)
    expect(updated.answer).not.toBeDefined()
  })

  describe('assign', () => {
    it('if the key exists in state, overwrites it', () => {
      updated = handler(graph, stateWithKey)
      expect(updated.answer).toBe('one')
    })

    it('if the key doesnt exist, creates it', () => {
      updated = handler(graph, state)
      expect(updated.answer).toBe('one')
    })
  })

  describe('append', () => {
    // TODO test we dont get a sum when both values are numbers
    it('if the key exists in state, appends to it', () => {
      updated = handler(appendGraph, stateWithKey)
      expect(updated.answer).toBe('initial valueone')
    })

    it('if the key doesnt exist, creates it', () => {
      updated = handler(appendGraph, state)
      expect(updated.answer).toBe('one')
    })
  })

  describe('increment', () => {
    it('if the key exists in state as a number, increments it', () => {
      updated = handler(incrementGraph, stateWithNumberKey)
      expect(updated.answer).toBe(15)
    })

    it('if the key exists in state as a string, init it as the value', () => {
      updated = handler(incrementGraph, stateWithKey)
      expect(updated.answer).toBe(5)
    })

    it('if the key doesnt exist, init it as the value', () => {
      updated = handler(incrementGraph, state)
      expect(updated.answer).toBe(5)
    })
  })

  describe('decrement', () => {
    it('if the key exists in state as a number, decrements it', () => {
      updated = handler(decrementGraph, stateWithNumberKey)
      expect(updated.answer).toBe(5)
    })

    it('if the key exists in state as a string, init it as negative value', () => {
      updated = handler(decrementGraph, stateWithKey)
      expect(updated.answer).toBe(-5)
    })

    it('if the key doesnt exist, init it as negative value', () => {
      updated = handler(decrementGraph, state)
      expect(updated.answer).toBe(-5)
    })
  })
})

it('sets the complete flag to false', () => {
  updated = handler(graph, state)
  expect(updated.complete).toEqual(false)
})
