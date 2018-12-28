let handler

const graph = require('../../../../fixtures/node_types')
const state = { current: 'random', path: [] }

let updated
const mockGetRandom = jest.fn()

beforeAll(() => {
  jest.mock('../helpers/getRandom', () => mockGetRandom)
  handler = require('./random')
})

afterEach(() => {
  mockGetRandom.mockClear()
})

describe('traversal', () => {
  const mockRandomChildId = 'the moon'

  beforeAll(() => {
    mockGetRandom.mockReturnValueOnce(mockRandomChildId)
    updated = handler(graph, state)
  })

  it('gets a random weighted child branch using the getRandom helper', () => {
    const arg = mockGetRandom.mock.calls[0][0]
    expect(arg.size).toEqual(2)
    const entries = Array.from(arg.entries())
    expect(entries[0][0]).toBe('randomiserBranch_one')
    expect(entries[0][1]).toBe(50)
    expect(entries[1][0]).toBe('randomiserBranch_two')
    expect(entries[1][1]).toBe(50)
  })

  it('sets the current node id in state to the random seleted child', () => {
    expect(updated.current).toBe(mockRandomChildId)
  })
})

it('the updated path is the input path', () => {
  expect(updated.path).toEqual([])
})

it('no additional properties are added', () => {
  expect(Object.keys(updated)).toEqual(Object.keys(state))
})
