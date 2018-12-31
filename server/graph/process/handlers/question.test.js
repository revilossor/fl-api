const handler = require('./question')

const graph = require('../../../../fixtures/node_types')
const state = { current: 'question', path: [] }

let updated

describe('traversal', () => {
  it('goes to the child answer whose utterances contains the utterance in state', () => {
    updated = handler(graph, { ...state, utterance: 'two' })
    expect(updated.current).toBe('answer_two')
  })

  it('if no child answer with utterances containing the utterance in state, goes to default', () => {
    updated = handler(graph, { ...state, utterance: 'the moon' })
    expect(updated.current).toBe('answer_one')
  })

  it('if the state has no utterance property, goes to default', () => {
    updated = handler(graph, state)
    expect(updated.current).toBe('answer_one')
  })
})

describe('text', () => {
  const stateWithText = { ...state, text: ['sometext'] }

  describe('if there is text in the next node', () => {
    it('if there is text in state, node text overwrites it', () => {
      updated = handler(graph, stateWithText)
      expect(updated.text).toEqual([
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

  describe('if there is no text in the next node', () => {
    const noTextGraph = JSON.parse(JSON.stringify(graph))

    beforeAll(() => {
      delete noTextGraph.processes.answer_one.metadata.text
    })

    it('if there is text in state, it is emptied', () => {
      updated = handler(noTextGraph, stateWithText)
      expect(updated.text).toEqual([])
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
    it('if there is audio in state, node audio overwrites it', () => {
      updated = handler(graph, stateWithAudio)
      expect(updated.audio).toEqual([
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

  describe('if there is no audio in the next node', () => {
    const noAudioGraph = JSON.parse(JSON.stringify(graph))

    beforeAll(() => {
      delete noAudioGraph.processes.answer_one.metadata.audio
    })

    it('if there is audio in state, it is removed', () => {
      updated = handler(noAudioGraph, stateWithAudio)
      expect(updated.audio).toEqual([])
    })

    it('if there is no audio in state, its created empty', () => {
      updated = handler(noAudioGraph, state)
      expect(updated.audio).toEqual([])
    })
  })
})

// describe('repromptText', () => {    // TODO any node that has a question node next will need to add reprompt stuff...
//
//   it('if there is no repromptText in the node, its not set in the updated state', () => {
//     const noTextGraph = JSON.parse(JSON.stringify(graph))
//     delete noTextGraph.processes.question.metadata.repromptText
//     updated = handler(noTextGraph, state)
//     expect(updated.repromptText).not.toBeDefined()
//   })
// })
//
// describe('repromptAudio', () => {
//   it('if there is repromptAudio in the node, its set in the updated state', () => {
//     updated = handler(graph, state)
//     expect(updated.repromptAudio).toBe('question_repromptAudio')
//   })
//
//   it('if there is no repromptText in the node, its not set in the updated state', () => {
//     const noRepromptAudioGraph = JSON.parse(JSON.stringify(graph))
//     delete noRepromptAudioGraph.processes.question.metadata.repromptAudio
//     updated = handler(noRepromptAudioGraph, state)
//     expect(updated.repromptAudio).not.toBeDefined()
//   })
// })

it('the utterance is removed from the updated state', () => {
  const input = { current: 'question', path: [], utterance: 'two' }
  updated = handler(graph, input)
  expect(updated).not.toEqual(expect.objectContaining({
    utterance: expect.anything()
  }))
})

it('the input state is not mutated', () => {
  const input = { current: 'question', path: [], utterance: 'two' }
  updated = handler(graph, input)
  expect(input).toEqual({ current: 'question', path: [], utterance: 'two' })
})

it('sets the complete flag to true', () => {
  const input = { current: 'question', path: [] }
  updated = handler(graph, input)
  expect(updated.complete).toEqual(true)
})
