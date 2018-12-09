const express = require('express')

beforeAll(() => {
  express.application.listen = jest.fn()
  require('./index')
})

it('listens on 8080', () => {
  expect(express.application.listen).toHaveBeenCalledWith(8080)
})
