const mockChildren = jest.fn()
let index
beforeAll(() => {
  jest.mock('./children', () => mockChildren)
  index = require('./index')
})

it('uses the children module for .children', () => {
  index.children()
  expect(mockChildren).toHaveBeenCalled()
})
