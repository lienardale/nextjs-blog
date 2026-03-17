/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
    '^@vnedyalk0v/react19-simple-maps$': '<rootDir>/__mocks__/react-simple-maps.tsx',
    '\\.*/countries-110m\\.json$': '<rootDir>/__mocks__/countries-110m.json',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    'app/\\[locale\\]/components/**/*.{ts,tsx}',
    '!lib/i18n/**',
    '!**/*.d.ts',
  ],
};
