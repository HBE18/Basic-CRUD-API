module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<src>/src/$1',
    },
    testMatch: [
      '<src>/test/**/(*.)test.(js|jsx|ts|tsx)',
    ],
    globals: {
      'ts-jest': {
        babel: true,
        tsConfig: "../tsconfig.json",
      }
    }
    
  };