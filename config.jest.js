module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  setupFiles: ['<rootDir>/test/setup.js'],
  clearMocks: true,
  restoreMocks: true,
};
