module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {},
  setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.test.json" }],
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
  },
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  snapshotResolver: "<rootDir>/config/jest/snapshotResolver.js",
  reporters: ["default", ["jest-junit", { outputDirectory: "reports/jest", outputName: "test-results.xml" }]],
};
