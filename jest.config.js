module.exports = {
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.js"
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.css$': 'jest-css-modules-transform',
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    // "^.+\\.[t|j]sx?$": "babel-jest",
    // '^.+\\.jsx?$': 'babel-jest'
  }
};