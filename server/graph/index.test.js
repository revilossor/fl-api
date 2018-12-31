let index

const linear = require('../../fixtures/linear_graph')

const mockProcessed = { the: 'moon' }
const mockProcess = jest.fn(() => mockProcessed)

const state = {
  current: 'startNode',
  path: []
}

beforeAll(() => {
  jest.mock('./process', () => mockProcess)
  index = require('./index')
})

afterEach(() => {
  mockProcess.mockClear()
})

describe('next', () => {
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

describe('lines', () => {
  it('throws if no graph is passed', () => {
    expect(() => index.lines()).toThrow('no graph passed!')
  })

  it('sets default if no state is passed', () => {
    index.lines(linear)
    expect(mockProcess).toHaveBeenCalledWith(linear, state)
  })

  it('calls with graph and state until the updated state has the complete flag set', () => {
    mockProcess
      .mockReturnValueOnce({ current: 'one', path: [], complete: false })
      .mockReturnValueOnce({ current: 'two', path: [], complete: false })
      .mockReturnValueOnce({ current: 'three', path: [], complete: false })
      .mockReturnValueOnce({ current: 'endNode', path: [], complete: true })

    const result = index.lines(linear, state)

    expect(mockProcess).toHaveBeenCalledWith(linear, state)
    expect(mockProcess).toHaveBeenCalledWith(linear, { current: 'one', path: [], complete: false })
    expect(mockProcess).toHaveBeenCalledWith(linear, { current: 'two', path: [], complete: false })
    expect(mockProcess).toHaveBeenCalledWith(linear, { current: 'three', path: [], complete: false })
    expect(mockProcess).toHaveBeenCalledTimes(4)

    expect(result).toEqual({ current: 'endNode', path: [], complete: true })
  })
})
