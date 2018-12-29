const handler = require('./talk')

const graph = require('../../../../fixtures/node_types')
const state = { current: 'talk_one', path: [] }

let updated

describe('traversal', () => {
  beforeAll(() => {
    updated = handler(graph, state)
  })

  it('the updated current is the next node', () => {
    expect(updated.current).toBe('question')
  })

  it('the updated path is the input path', () => {
    expect(updated.path).toEqual([])
  })
})

describe('text', () => {
  const stateWithText = { ...state, text: ['sometext'] }
  describe('if there is text in the next node', () => {
    it('if there is text in state, node text is appended to it', () => {
      updated = handler(graph, stateWithText)
      expect(updated.text).toEqual([
        ...stateWithText.text,
        'question_text'
      ])
    })

    it('if there is no text in state, its created containing node text', () => {
      updated = handler(graph, state)
      expect(updated.text).toEqual([
        'question_text'
      ])
    })
  })

  describe('if there is no text in the next node node', () => {
    const noTextGraph = JSON.parse(JSON.stringify(graph))

    beforeAll(() => {
      delete noTextGraph.processes.question.metadata.text
    })

    it('if there is text in state, it remains the same', () => {
      updated = handler(noTextGraph, stateWithText)
      expect(updated.text).toEqual(stateWithText.text)
    })

    it('if there is no text in state, its created empty', () => {
      updated = handler(noTextGraph, state)
      expect(updated.text).toEqual([])
    })
  })
})

describe('audio', () => {
  const stateWithAudio = { ...state, audio: ['someaudio'] }

  describe('if there is audio in the next node', () => {
    it('if there is audio in state, node audio is appended to it', () => {
      updated = handler(graph, stateWithAudio)
      expect(updated.audio).toEqual([
        ...stateWithAudio.audio,
        'question_audio'
      ])
    })

    it('if there is no audio in state, its created containing node audio', () => {
      updated = handler(graph, state)
      expect(updated.audio).toEqual([
        'question_audio'
      ])
    })
  })

  describe('if there is no audio in the next node', () => {
    const noAudioGraph = JSON.parse(JSON.stringify(graph))

    beforeAll(() => {
      delete noAudioGraph.processes.question.metadata.audio
    })

    it('if there is audio in state, it remains the same', () => {
      updated = handler(noAudioGraph, stateWithAudio)
      expect(updated.audio).toEqual(stateWithAudio.audio)
    })

    it('if there is no audio in state, its created empty', () => {
      updated = handler(noAudioGraph, state)
      expect(updated.audio).toEqual([])
    })
  })
})
