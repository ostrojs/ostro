import { describe, test, expect } from "@jest/globals";
import path from 'node:path';
import fs from 'node:fs';

describe('Vite Configuration and Asset Pipeline Suite', () => {
    test('vite.config.ts configures frontend js and css bundles correctly', () => {
        const viteConfigPath = path.resolve(__dirname, '../src/vite.config.ts');
        expect(fs.existsSync(viteConfigPath)).toBe(true);

        const viteCode = fs.readFileSync(viteConfigPath, 'utf8');
        expect(viteCode).toContain("import { defineConfig } from 'vite'");
        expect(viteCode).toContain("import ostro from '@ostro/vite'");
        expect(viteCode).toContain("'resources/assets/css/app.css'");
        expect(viteCode).toContain("'resources/assets/js/app.ts'");
    });

    test('verifies existence of default asset sources and public templates', () => {
        const rootSrc = path.resolve(__dirname, '../src');
        const welcomeView = path.join(rootSrc, 'resources/views/welcome.html');
        const favicon = path.join(rootSrc, 'public/favicon.ico');
        const robots = path.join(rootSrc, 'public/robots.txt');
        const appCss = path.join(rootSrc, 'resources/assets/css/app.css');
        const appTs = path.join(rootSrc, 'resources/assets/js/app.ts');

        expect(fs.existsSync(welcomeView)).toBe(true);
        expect(fs.existsSync(favicon)).toBe(true);
        expect(fs.existsSync(robots)).toBe(true);
        expect(fs.existsSync(appCss)).toBe(true);
        expect(fs.existsSync(appTs)).toBe(true);
    });
});
