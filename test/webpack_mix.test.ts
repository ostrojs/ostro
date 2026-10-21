import path from 'path';
import fs from 'fs';

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
            postCss: jest.fn((src: string, dest: string, plugins: any[]) => {
                registeredPostCss.push({ src, dest, plugins });
                return mockMix;
            }),
            version: jest.fn(() => mockMix),
            sourceMaps: jest.fn(() => mockMix)
        };
    });

    test('webpack.mix.js configures frontend js and css bundles correctly', () => {
        const webpackMixPath = path.resolve(__dirname, '../src/webpack.mix.js');
        expect(fs.existsSync(webpackMixPath)).toBe(true);

        const mixCode = fs.readFileSync(webpackMixPath, 'utf8');
        expect(mixCode).toContain("mix.js('resources/assets/js/app.js', 'public/js')");
        expect(mixCode).toContain("postCss('resources/assets/css/app.css', 'public/css'");

        // Exercise the builder chain with mockMix
        mockMix.js('resources/assets/js/app.js', 'public/js')
               .postCss('resources/assets/css/app.css', 'public/css', []);

        expect(mockMix.js).toHaveBeenCalledWith('resources/assets/js/app.js', 'public/js');
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
