const handler = require('./answer')

const graph = require('../../../../fixtures/node_types')

const state = { current: 'answer_one', path: [] }
const stateWithText = { ...state, text: ['sometext'] }
const stateWithAudio = { ...state, audio: ['someaudio'] }

let updated

// if state operations - assign, append, increment, decrement

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
  describe('if there is text in the node', () => {
    it('if there is text in state, node text is appended to it', () => {
      updated = handler(graph, stateWithText)
      expect(updated.text).toEqual([
        ...stateWithText.text,
        'answer_one_text'
      ])
    })

    it('if there is no text in state, its created containing node text', () => {
      updated = handler(graph, state)
      expect(updated.text).toEqual([
        'answer_one_text'
      ])
    })
  })

  describe('if there is no text in the node', () => {
    const noTextGraph = JSON.parse(JSON.stringify(graph))

    beforeAll(() => {
      delete noTextGraph.processes.answer_one.metadata.text
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
  describe('if there is audio in the node', () => {
    it('if there is audio in state, node audio is appended to it', () => {
      updated = handler(graph, stateWithAudio)
      expect(updated.audio).toEqual([
        ...stateWithAudio.audio,
        'answer_one_audio'
      ])
    })

    it('if there is no audio in state, its created containing node audio', () => {
      updated = handler(graph, state)
      expect(updated.audio).toEqual([
        'answer_one_audio'
      ])
    })
  })

  describe('if there is no audio in the node', () => {
    const noAudioGraph = JSON.parse(JSON.stringify(graph))

    beforeAll(() => {
      delete noAudioGraph.processes.answer_one.metadata.audio
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

//
// describe('if there is no audio in state', () => {})
// describe('if there is audio in state', () => {})
//
// describe('state operations', () => {
//   describe('assign', () => {})
//   describe('append', () => {})
//   describe('increment', () => {})
//   describe('decrement', () => {})
// })
