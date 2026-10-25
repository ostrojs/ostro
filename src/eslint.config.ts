import fs from 'node:fs';
import path from 'node:path';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

// Level 1: Read tsconfig as the first-level configuration base
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

const tsIncludes: string[] = tsconfig.include || ['**/*.ts'];
const tsExcludes: string[] = (tsconfig.exclude || []).map((pattern: string) => {
    if (pattern.startsWith('*')) return pattern;
    return pattern.includes('/') || pattern.includes('*') ? pattern : `${pattern}/**`;
});

// Level 2: ESLint configuration built on top of tsconfig
export default defineConfig(
    globalIgnores([
        ...tsExcludes,
        '.dist/**',
        'storage/**',
        'public/**',
        'build/**',
        'resources/assets/**',
        'webpack.mix.*',
        'eslint.config.*',
        'jest.config.*'
    ]),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: tsIncludes,
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module'
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
);
