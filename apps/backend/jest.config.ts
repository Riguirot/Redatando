import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // 👇 Só onde existe teste real agora
  roots: ['<rootDir>/src/modules', '<rootDir>/src/tests'], 

  moduleFileExtensions: ['ts', 'js', 'json'],

  testMatch: ['**/*.spec.ts'],

  clearMocks: true,
  collectCoverage: false,

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: [],
}

export default config
