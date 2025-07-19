module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/src'],
	testMatch: ['**/__tests__/**/*.test.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/__tests__/**',
		'!src/**/*.test.ts',
	],
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['<rootDir>/src/demo.ts'],
	coverageReporters: ['text', 'lcov', 'html'],
	verbose: true,
};