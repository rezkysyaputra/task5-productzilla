module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000, // Set timeout untuk tes
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
