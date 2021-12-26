export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  rootDir: './',
  testPathIgnorePatterns: ['/node_modules/', '/*.js', '/samples/'],
  modulePathIgnorePatterns: ['/samples'],
};
