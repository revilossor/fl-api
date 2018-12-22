// start, end, question, answer, talk, scene, shuffleandtake, decision, random, randomiserBrance, fork, branch
const { next } = require('./index')

const linear = require('../../fixtures/linear_graph')
const validate = require('../validate')

describe('next', () => {

  beforeAll(() => {
    jest.spyOn(validate, 'graph')
  })

  it('throws if no graph is passed', () => {
    expect(() => next()).toThrow('no graph passed!')
  })

  describe('validates the graph argument', () => {

    const someInvalidGraph = { the: 'moon' }
    const mockValidateError = Error('mock validate error')

    it('uses the validate module', () => {
      validate.graph.mockReturnValueOnce({ errors: [] })
      next(someInvalidGraph)
      expect(validate.graph).toHaveBeenCalledWith(someInvalidGraph)
    })

    it('throws errors from the validation module', () => {
      validate.graph.mockReturnValueOnce({ errors: [ mockValidateError ] })
      expect(() => next(someInvalidGraph)).toThrow(mockValidateError)
    })

    it('doesnt throw if a valid graph is passed', () => {
      expect(() => next(linear)).not.toThrow()
    })

  })
})
