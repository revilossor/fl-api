const handler = require('./branch')

const graph = require('../../../../fixtures/node_types')
const state = { current: 'branch_one', path: [] }

let updated

describe('traversal', () => {
  beforeAll(() => {
    updated = handler(graph, state)
  })

  it('the updated current is the next node', () => {
    expect(updated.current).toBe('shuffleAndTake')
  })

  it('the updated path is the input path', () => {
    expect(updated.path).toEqual([])
  })
})

describe('text', () => {
  const stateWithText = { ...state, text: ['sometext'] }

  describe('if there is text in the next node', () => {
    const textGraph = JSON.parse(JSON.stringify(graph))
    const value = 'some more text'

    beforeAll(() => {
      textGraph.processes.shuffleAndTake.metadata.text = value
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

  const audioGraph = JSON.parse(JSON.stringify(graph))
  const value = 'some maore audio'

  beforeAll(() => {
    audioGraph.processes.shuffleAndTake.metadata.audio = value
  })

  describe('if there is audio in the next node', () => {
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
