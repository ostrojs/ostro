import { execSync } from "child_process";
import path from "path";
import fs from "fs";

let tsJestPath = "ts-jest";
try {
    tsJestPath = require.resolve("ts-jest");
} catch {
    try {
        const globalRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
        const candidate = path.join(globalRoot, "ts-jest");
        if (fs.existsSync(candidate)) {
            tsJestPath = candidate;
        }
    } catch {}
}

export default {
    "testEnvironment": "node",
    "testMatch": [
        "<rootDir>/test/**/*.test.ts",
        "<rootDir>/test/**/*.test.js",
        "<rootDir>/src/test/**/*.test.ts",
        "<rootDir>/src/test/**/*.test.js"
    ],
    "modulePathIgnorePatterns": [
        "<rootDir>/build"
    ],
    "transform": {
        "^.+\\.ts$": [
            tsJestPath,
            {
                "tsconfig": "<rootDir>/tsconfig.json"
            }
        ]
    },
    "moduleNameMapper": {
        "^~/(.*)$": "<rootDir>/src/$1"
    },
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "coverageReporters": [
        "text",
        "lcov",
        "clover"
    ],
    "collectCoverageFrom": [
        "<rootDir>/src/app/**/*.ts",
        "<rootDir>/src/bootstrap/app.ts",
        "<rootDir>/src/routes/**/*.ts",
        "<rootDir>/src/database/migrations/**/*.ts",
        "<rootDir>/src/database/seeders/**/*.ts",
        "!<rootDir>/node_modules/**",
        "!<rootDir>/test/**",
        "!<rootDir>/src/test/**",
        "!<rootDir>/src/jest.config.ts",
        "!<rootDir>/src/webpack.mix.js",
        "!<rootDir>/coverage/**"
    ]
};
