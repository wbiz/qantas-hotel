const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })

module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom', //'jsdom', // Use jsdom to simulate the browser environment
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Optional: For module aliasing if needed
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Add jest-dom matchers
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'], // Collect coverage from all source files
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Ignore these directories
})
