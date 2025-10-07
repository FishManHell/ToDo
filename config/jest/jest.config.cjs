const path = require("path");

/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>config/jest/jest-setup.ts'],

	transformIgnorePatterns: [
		'node_modules/(?!(axios)/)',
	],
	clearMocks: true,
	coveragePathIgnorePatterns: [
		"\\\\node_modules\\\\"
	],
	moduleDirectories: [
		"node_modules"
	],
	moduleFileExtensions: [
		"js",
		"jsx",
		"ts",
		"tsx",
		"json",
		"node"
	],
	rootDir: '../../',
	testMatch: [
		'<rootDir>/**/*(*.)@(spec|test).[tj]s?(x)',
	],
	modulePaths: [
		"<rootDir>src",
	],

	moduleNameMapper: {
		'\\.s?css$': 'identity-obj-proxy',
		'\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
	},

	globals: { __PROJECT__: 'jest' },
};