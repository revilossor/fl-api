const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const validate = require('../validate')
const linear = require('../../fixtures/linear_graph')
const graph = require('../graph')

let app

beforeAll(() => {
  jest.spyOn(validate, 'request')
  jest.spyOn(express.Router, 'route')
  app = express()
  app.use(bodyParser.json())
  app.use('/', require('./next'))
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
  const state = { the: 'moon' }
  const node = 'one'

  beforeAll(() => {
    jest.spyOn(graph, 'next')
  })

  afterEach(() => {
    graph.next.mockClear()
  })

  it('calls graph.next with the posted arguments', () => {
    const input = { graph: linear, node, state }
    return request(app).post('/')
      .send(input)
      .then(response => {
        expect(graph.next).toHaveBeenCalledWith(linear, node, state)
      })
  })

  // TODO test this for nodes that mutate?
  it('if no state is supplied in the post body sets an empty object in the response', () => {
    const input = { graph: linear, node }
    return request(app).post('/')
      .send(input)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.text)).toEqual({ ...input, state: {} })
      })
  })

  it('responds with the input arguments', () => {
    const input = { graph: linear, node, state }
    return request(app).post('/')
      .send(input)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.text)).toEqual(input)
      })
  })
})
