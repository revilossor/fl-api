const express = require('express')

const mockVersionRouter = jest.fn((req, res) => res.send('mockVersionRouter'))
const mockNextRouter = jest.fn((req, res) => res.send('mockNextRouter'))
const mockLinesRouter = jest.fn((req, res) => res.send('mockLinesRouter'))

const mockJson = { mock: 'json' }
const mockJsonParserMiddleware = (req, res, next) => {
  req.body = mockJson
  next()
}

beforeAll(() => {
  jest.spyOn(express.application, 'use')
  jest.mock('./routers/version', () => mockVersionRouter)
  jest.mock('./routers/next', () => mockNextRouter)
  jest.mock('./routers/lines', () => mockLinesRouter)
  jest.mock('body-parser', () => ({
    json: jest.fn(() => mockJsonParserMiddleware)
  }))
  require('./app')
})

it('parses json', () => {
  expect(express.application.use).toHaveBeenCalledWith(mockJsonParserMiddleware)
})

it('uses the version router on /version to get the the version of the app', () => {
  expect(express.application.use).toHaveBeenCalledWith('/version', mockVersionRouter)
})

it('uses the next router on /next to get the next node in a graph', () => {
  expect(express.application.use).toHaveBeenCalledWith('/next', mockNextRouter)
})

it('uses the lines router on /lines to get all output stuff until user interaction required, or end', () => {
  expect(express.application.use).toHaveBeenCalledWith('/lines', mockLinesRouter)
})
