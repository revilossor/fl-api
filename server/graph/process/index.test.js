let index

const mockHandle = {
  answer: jest.fn(() => 'answer'),
  branch: jest.fn(() => 'branch'),
  decision: jest.fn(() => 'decision'),
  end: jest.fn(() => 'end'),
  fork: jest.fn(() => 'fork'),
  question: jest.fn(() => 'question'),
  random: jest.fn(() => 'random'),
  randomiserBranch: jest.fn(() => 'randomiserBranch'),
  scene: jest.fn(() => 'scene'),
  shuffleandtake: jest.fn(() => 'shuffleandtake'),
  start: jest.fn(() => 'start'),
  talk: jest.fn(() => 'talk')
}

const graph = { processes: { node: { component: 'type' } } }
const state = { current: 'node', path: [] }

beforeAll(() => {
  jest.mock('./handlers', () => mockHandle)
  index = require('./index')
})

afterEach(() => {
  jest.clearAllMocks()
})

it('calls the handler for the type', () => {
  Object.keys(mockHandle).forEach(type => {
    graph.processes.node.component = type
    index(graph, state)
    expect(mockHandle[type]).toHaveBeenCalledWith(graph, state)
  })
})

it(`returns the value`, () => {
  Object.keys(mockHandle).forEach(type => {
    graph.processes.node.component = type
    expect(index(graph, state)).toEqual(type)
  })
})
