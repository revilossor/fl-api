const express = require('express')
const mockVersionRouter = jest.fn((req, res) => res.send('mockVersionRouter'))

beforeAll(() => {
  jest.spyOn(express.application, 'use')
  jest.mock('./routers/version', () => mockVersionRouter)
  require('./app')
})

it('uses the version router for /version', () => {
  expect(express.application.use).toHaveBeenCalledWith('/version', mockVersionRouter)
})
