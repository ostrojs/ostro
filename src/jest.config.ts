import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import type { Config } from 'jest';

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

const config: Config = {
    testEnvironment: 'node',
    testMatch: [
        '**/test/**/*.test.ts',
        '**/test/**/*.test.js'
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/build'
    ],
    transform: {
        '^.+\\.ts$': [
            tsJestPath,
            {
                tsconfig: '<rootDir>/tsconfig.json'
            }
        ]
    },
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1'
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: [
        'text',
        'lcov',
        'clover'
    ],
    collectCoverageFrom: [
        '<rootDir>/app/**/*.ts',
        '<rootDir>/bootstrap/app.ts',
        '<rootDir>/routes/**/*.ts',
        '<rootDir>/database/migrations/**/*.ts',
        '<rootDir>/database/seeders/**/*.ts',
        '!<rootDir>/node_modules/**',
        '!<rootDir>/test/**',
        '!<rootDir>/coverage/**'
    ]
};

export default config;
