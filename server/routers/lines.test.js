const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const validate = require('../validate')
const types = require('../../fixtures/node_types')
const graph = require('../graph')

let app

beforeAll(() => {
  jest.spyOn(validate, 'request')
  jest.spyOn(express.Router, 'route')
  app = express()
  app.use(bodyParser.json())
  app.use('/', require('./lines'))
})

it('sets a route for "/"', () => {
  expect(express.Router.route).toHaveBeenCalledWith('/')
})

it('404 for GET requests', () => request(app).get('/')
  .then(response => {
    expect(response.statusCode).toBe(404)
  })
)

describe('if the post request is invalid', () => {
  const someInvalidGraph = { the: 'moon' }
  const mockValidateError = Error('mock validate error')

  let response

  beforeAll(() => {
    validate.request.mockReturnValueOnce({ errors: [mockValidateError] })
    return request(app).post('/')
      .send(someInvalidGraph)
      .then(res => { response = res })
  })

  it('uses the validate module', () => {
    expect(validate.request).toHaveBeenCalledWith(someInvalidGraph)
  })

  it('500s with the response from the validate module', () => {
    expect(response.status).toBe(500)
    expect(response.text).toContain(mockValidateError)
  })
})

describe('if the request is valid', () => {
  const state = { current: 'startNode', path: [] }

  beforeAll(() => {
    jest.spyOn(graph, 'lines')
  })

  afterEach(() => {
    graph.lines.mockClear()
  })

  it('calls graph.lines with the posted arguments', () => {
    const input = { graph: types, state }
    return request(app).post('/')
      .send(input)
      .then(response => {
        expect(graph.lines).toHaveBeenCalledWith(types, state)
      })
  })

  it('returns the response', () => {
    const input = { graph: types }
    const out = { the: 'moon' }
    graph.lines.mockReturnValueOnce(out)
    return request(app).post('/')
      .send(input)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.text)).toEqual({
          graph: types,
          state: out
        })
      })
  })
})
