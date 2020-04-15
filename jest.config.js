module.exports = {
  preset: 'ts-jest',
  rootDir: __dirname,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[t]s'],
  moduleFileExtensions: ['ts', 'js'],
  watchPathIgnorePatterns: ['/node_modules/', '/.git/']
  // coverageDirectory: 'coverage',
  // coverageReporters: ['html', 'lcov', 'text'],
  // collectCoverageFrom: [
  //   '/algorithms/**/*.{js,ts}',
  //   '/data-structures/**/*.{js,ts}'
  // ],
  // coveragePathIgnorePatterns: ['/node_modules/', '/leetcode/']
}
