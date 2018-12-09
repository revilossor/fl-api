const express = require('express')
const mockVersionRouter = jest.fn((req, res) => res.send('mockVersionRouter'))
const mockJson = { mock: 'json' }
const mockJsonParserMiddleware = (req, res, next) => {
  req.body = mockJson
  next()
}

beforeAll(() => {
  jest.spyOn(express.application, 'use')
  jest.mock('./routers/version', () => mockVersionRouter)
  jest.mock('body-parser', () => ({
    json: jest.fn(() => mockJsonParserMiddleware)
  }))
  require('./app')
})

it('parses json', () => {
  expect(express.application.use).toHaveBeenCalledWith(mockJsonParserMiddleware)
})

it('uses the version router for /version', () => {
  expect(express.application.use).toHaveBeenCalledWith('/version', mockVersionRouter)
})
