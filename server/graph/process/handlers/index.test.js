const mockHandlers = {
  answer: jest.fn(),
  branch: jest.fn(),
  decision: jest.fn(),
  end: jest.fn(),
  fork: jest.fn(),
  question: jest.fn(),
  random: jest.fn(),
  randomiserBranch: jest.fn(),
  scene: jest.fn(),
  shuffleandtake: jest.fn(),
  start: jest.fn(),
  talk: jest.fn()
}

let index

beforeAll(() => {
  Object.keys(mockHandlers).forEach(mock => {
    jest.mock(`./${mock}`, () => mockHandlers[mock])
  })
  index = require('./index')
})

afterEach(() => {
  jest.clearAllMocks()
})

Object.keys(mockHandlers).forEach(type => {
  it(`uses the ${type} handler for "${type}"`, () => {
    const graph = 'graph'
    const state = 'state'
    index[type](graph, state)
    expect(mockHandlers[type]).toHaveBeenCalledWith(graph, state)
  })
})
