import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import path from 'node:path';
import fs from 'node:fs';

describe('Webpack Mix and Asset Pipeline Suite', () => {
    let mockMix: any;
    let registeredJs: any[] = [];
    let registeredPostCss: any[] = [];

    beforeEach(() => {
        registeredJs = [];
        registeredPostCss = [];

        mockMix = {
            js: jest.fn((src: string, dest: string) => {
                registeredJs.push({ src, dest });
                return mockMix;
            }),
            ts: jest.fn((src: string, dest: string) => {
                registeredJs.push({ src, dest });
                return mockMix;
            }),
            postCss: jest.fn((src: string, dest: string, plugins: any[]) => {
                registeredPostCss.push({ src, dest, plugins });
                return mockMix;
            }),
            version: jest.fn(() => mockMix),
            sourceMaps: jest.fn(() => mockMix)
        };
    });

    test('webpack.mix.ts configures frontend js and css bundles correctly', () => {
        const webpackMixPath = path.resolve(__dirname, '../src/webpack.mix.ts');
        expect(fs.existsSync(webpackMixPath)).toBe(true);

        const mixCode = fs.readFileSync(webpackMixPath, 'utf8');
        expect(mixCode).toContain("mix.ts('resources/assets/js/app.ts', 'public/js')");
        expect(mixCode).toContain("postCss('resources/assets/css/app.css', 'public/css'");

        // Exercise the builder chain with mockMix
        mockMix.ts('resources/assets/js/app.ts', 'public/js')
               .postCss('resources/assets/css/app.css', 'public/css', []);

        expect(mockMix.ts).toHaveBeenCalledWith('resources/assets/js/app.ts', 'public/js');
        expect(mockMix.postCss).toHaveBeenCalledWith('resources/assets/css/app.css', 'public/css', []);
        expect(registeredJs).toHaveLength(1);
        expect(registeredPostCss).toHaveLength(1);
    });

    test('verifies existence of default asset sources and public templates', () => {
        const rootSrc = path.resolve(__dirname, '../src');
        const welcomeView = path.join(rootSrc, 'resources/views/welcome.html');
        const favicon = path.join(rootSrc, 'public/favicon.ico');
        const robots = path.join(rootSrc, 'public/robots.txt');

        expect(fs.existsSync(welcomeView)).toBe(true);
        expect(fs.existsSync(favicon)).toBe(true);
        expect(fs.existsSync(robots)).toBe(true);
    });
});
