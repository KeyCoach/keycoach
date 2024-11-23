import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  testMatch: ["**/*.test.ts"],
  setupFiles: ["./env-setup.js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
