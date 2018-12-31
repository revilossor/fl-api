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
