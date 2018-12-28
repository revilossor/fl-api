let index

const linear = require('../../fixtures/linear_graph')

const mockProcessed = { the: 'moon' }
const mockProcess = jest.fn(() => mockProcessed)

const state = {
  current: 'startNode',
  path: []
}

describe('next', () => {
  beforeAll(() => {
    jest.mock('./process', () => mockProcess)
    index = require('./index')
  })

  afterEach(() => {
    mockProcess.mockClear()
  })

  it('throws if no graph is passed', () => {
    expect(() => index.next()).toThrow('no graph passed!')
  })

  it('sets default if no state is passed', () => {
    index.next(linear)
    expect(mockProcess).toHaveBeenCalledWith(linear, state)
  })

  it('calls process once with graph and state', () => {
    index.next(linear, state)
    expect(mockProcess).toHaveBeenCalledWith(linear, state)
    expect(mockProcess).toHaveBeenCalledTimes(1)
  })
})
