const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')

let app

beforeAll(() => {
  jest.spyOn(express.Router, 'route')
  app = express()
  app.use(bodyParser.json())
  app.use('/', require('./next'))
})

it('sets a route for "/"', () => {
  expect(express.Router.route).toHaveBeenCalledWith('/')
})

describe('if there are missing properties in the post request', () => {
  it('400 with missing story property', () => request(app).post('/')
    .send({ state: {}, current: 'nodeId' })
    .then(response => {
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.text).errors).toContain('missing "story" property in request')
    })
  )
  it('400 with missing state property', () => request(app).post('/')
    .send({ story: {}, current: 'nodeId' })
    .then(response => {
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.text).errors).toContain('missing "state" property in request')
    })
  )
  it('400 with missing current property', () => request(app).post('/')
    .send({ state: {}, story: {} })
    .then(response => {
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.text).errors).toContain('missing "current" property in request')
    })
  )
  it('400 with all missing properties', () => request(app).post('/')
    .send({})
    .then(response => {
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.text).errors).toContain('missing "story" property in request')
      expect(JSON.parse(response.text).errors).toContain('missing "state" property in request')
      expect(JSON.parse(response.text).errors).toContain('missing "current" property in request')
    })
  )
})

describe('if all the parameters are supplied', () => {
  it('responds with the input arguments', () => {
    const input = { story: {}, state: {}, current: 'nodeId' }
    return request(app).post('/')
      .send(input)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.text)).toEqual(input)
      })
  })
})
