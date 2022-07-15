module.exports = {
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "\\.scss$": "<rootDir>/emptyModule.js",
  },
  testEnvironment: "jsdom",
};
