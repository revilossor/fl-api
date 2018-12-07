const request = require('supertest')
const express = require('express')

let app

const mockPackageJSON = { version: 'a.b.c' }

beforeAll(() => {
  jest.mock('../../package.json', () => mockPackageJSON)

  app = express()
  app.use('/', require('./version'))
})

it('responds with the package json version', () => request(app).get('/')
  .then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe(JSON.stringify({ version: mockPackageJSON.version }))
  })
)
