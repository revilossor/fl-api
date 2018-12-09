const request = require('supertest')

let app
const mockVersionRouter = jest.fn((req, res) => res.send('mockVersionRouter'))

beforeAll(() => {
  jest.mock('./routers/version', () => mockVersionRouter)
  app = require('./app')
})

it('uses the version router for /version', () => request(app).get('/version')
  .then(response => {
    expect(mockVersionRouter).toHaveBeenCalled()
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('mockVersionRouter')
  })
)
