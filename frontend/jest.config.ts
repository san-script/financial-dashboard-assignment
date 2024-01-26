export default {
	preset: "ts-jest",
	// testEnvironment: "jsdom",
	testEnvironment: "jest-environment-jsdom",
	roots: ["<rootDir>/src"],
	testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.(css|less|scss)$": "identity-obj-proxy",
	},
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
		},
	},
	transform: {
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.tsx?$": "ts-jest",
	},
	transformIgnorePatterns: ["/node_modules/(?!@amcharts/amcharts4/)"],
};
