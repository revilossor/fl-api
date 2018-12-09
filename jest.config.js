module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'server/**/*.js',
    '!server/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: ['/node_modules/']
}
