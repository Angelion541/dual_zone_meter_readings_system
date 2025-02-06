module.exports = {
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.js"
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testMatch: ["**/*.test.js"],
  moduleFileExtensions: ["js", "cjs", "mjs"],
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.css$': 'jest-css-modules-transform',
    "^.+\\.(js|jsx|ts|tsx|cjs)$": "babel-jest",
    // "^.+\\.[t|j]sx?$": "babel-jest",
    // '^.+\\.jsx?$': 'babel-jest'
  }
};