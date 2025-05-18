// Jest configuration for TypeScript and React/JSX support
// Uses ts-jest for .ts/.tsx and babel-jest for .js/.jsx files
// Jest configuration using the official next/jest preset for Next.js + TypeScript + React
// NOTE: For pnpm and npm, use 'next/jest' (not '@next/jest')
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  // Use the modern entry point for jest-dom and global test setup (e.g., scrollIntoView mock)
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/tests/setupTests.js',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle module aliases (adjust as needed)
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(customJestConfig);