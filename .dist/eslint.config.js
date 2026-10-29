"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const js_1 = __importDefault(require("@eslint/js"));
const config_1 = require("eslint/config");
const typescript_eslint_1 = __importDefault(require("typescript-eslint"));
// Level 1: Read tsconfig as the first-level configuration base
const tsconfigPath = node_path_1.default.join(process.cwd(), 'tsconfig.json');
const tsconfig = JSON.parse(node_fs_1.default.readFileSync(tsconfigPath, 'utf8'));
const tsIncludes = tsconfig.include || ['**/*.ts'];
const tsExcludes = (tsconfig.exclude || []).map((pattern) => {
    if (pattern.startsWith('*'))
        return pattern;
    return pattern.includes('/') || pattern.includes('*') ? pattern : `${pattern}/**`;
});
// Level 2: ESLint configuration built on top of tsconfig
exports.default = (0, config_1.defineConfig)((0, config_1.globalIgnores)([
    ...tsExcludes,
    'storage/**',
    'public/**',
    'build/**',
    'resources/assets/**',
    'webpack.mix.ts',
    'eslint.config.ts'
]), js_1.default.configs.recommended, ...typescript_eslint_1.default.configs.recommended, {
    files: tsIncludes,
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'off'
    }
});
