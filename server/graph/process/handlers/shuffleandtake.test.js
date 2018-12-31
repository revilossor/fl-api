let handler

const graph = require('../../../../fixtures/node_types')
const state = { current: 'shuffleAndTake', path: [] }

let updated
const mockGetRandom = jest.fn()

beforeAll(() => {
  jest.mock('../helpers/getRandom', () => mockGetRandom)
  handler = require('./shuffleAndTake')
})

afterEach(() => {
  mockGetRandom.mockClear()
})

const mockRandomChildId = 'talk_shuffle_one'

beforeAll(() => {
  mockGetRandom.mockReturnValueOnce(mockRandomChildId)
  updated = handler(graph, state)
})

describe('first shuffle', () => {
  it('gets a random child branch using the getRandom helper, with weight 1', () => {
    const arg = mockGetRandom.mock.calls[0][0]
    expect(arg.size).toEqual(1)
    const entries = Array.from(arg.entries())
    expect(entries[0][0]).toBe(mockRandomChildId)
    expect(entries[0][1]).toBe(1)
  })

  it('sets the current node id in state to the random seleted child', () => {
    expect(updated.current).toBe(mockRandomChildId)
  })

  it('the chosen child node is recorded in state', () => {
    expect(updated.taken).toEqual([ mockRandomChildId ])
  })
})

describe('finally', () => {
  beforeAll(() => {
    updated = handler(graph, { ...state, taken: [ mockRandomChildId ] })
  })

  it('sets the current node id in state to the finally child', () => {
    expect(updated.current).toBe('talk_shuffle_two')
  })

  it('clears the taken array from state', () => {
    expect(updated.taken).not.toBeDefined()
  })
})
