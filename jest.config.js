module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
    '!<rootDir>/src/types/**/*.test.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
};
