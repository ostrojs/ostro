import fs from 'node:fs';
import path from 'node:path';

export function preparePackage(pkgDir: string = process.cwd()): void {
    const rootPkgPath: string = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(rootPkgPath)) {
        console.error('No package.json found in ' + pkgDir);
        process.exit(1);
    }

    const rootPkg: Record<string, any> = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
    const buildDir: string = path.join(pkgDir, 'build');
    const srcDir: string = path.join(pkgDir, 'src');

    if (!fs.existsSync(buildDir)) {
        console.error('Build directory does not exist: ' + buildDir);
        process.exit(1);
    }

    const pubPkg: Record<string, any> = { ...rootPkg };

    if (pubPkg.name !== '@ostro/ostro') delete pubPkg.devDependencies;
    if (pubPkg.name === '@ostro/ostro') {
        pubPkg.main = 'app.ts';
        pubPkg.types = 'app.ts';
        pubPkg.scripts = {
            'lint:check': 'eslint .',
            'lint:fix': 'eslint . --fix',
            'dev': 'npm run development',
            'development': 'mix --mix-config=webpack.mix.ts',
            'watch': 'mix watch --mix-config=webpack.mix.ts',
            'watch-poll': 'mix watch --mix-config=webpack.mix.ts -- --watch-options-poll=1000',
            'hot': 'mix watch --hot --mix-config=webpack.mix.ts',
            'prod': 'npm run production',
            'build': 'npm run lint:check && ostro-build',
            'build:clean': 'rm -rf .dist && npm run build',
            'server:start': 'ts-node app.ts',
            'test': 'npx jest'
        };
    } else {
        delete pubPkg.scripts;
    }
    delete pubPkg.files;

    const stripBuild = (str: any): any => {
        if (!str || typeof str !== 'string') return str;
        return str.replace(/^(\.\/)?build\//, './');
    };

    if (pubPkg.name !== '@ostro/ostro') {
        if (pubPkg.main) pubPkg.main = stripBuild(pubPkg.main).replace(/^\.\//, '');
        if (pubPkg.types) pubPkg.types = stripBuild(pubPkg.types).replace(/^\.\//, '');
    }
    if (pubPkg.bin) {
        if (typeof pubPkg.bin === 'string') {
            pubPkg.bin = stripBuild(pubPkg.bin).replace(/^\.\//, '');
        } else if (typeof pubPkg.bin === 'object' && pubPkg.bin !== null) {
            const newBin: Record<string, string> = {};
            for (const [k, v] of Object.entries(pubPkg.bin)) {
                newBin[k] = stripBuild(v).replace(/^\.\//, '');
            }
            pubPkg.bin = newBin;
        }
    }

    if (pubPkg.exports) {
        const rewriteExports = (obj: any): any => {
            if (typeof obj === 'string') return stripBuild(obj);
            if (Array.isArray(obj)) return obj.map(rewriteExports);
            if (typeof obj === 'object' && obj !== null) {
                const res: Record<string, any> = {};
                for (const [k, v] of Object.entries(obj)) {
                    res[k] = rewriteExports(v);
                }
                return res;
            }
            return obj;
        };
        pubPkg.exports = rewriteExports(pubPkg.exports);
    }

    fs.writeFileSync(path.join(buildDir, 'package.json'), JSON.stringify(pubPkg, null, 2) + '\n');

    const copyRootFile = (file: string): void => {
        const src: string = path.join(pkgDir, file);
        if (fs.existsSync(src)) {
            const dest: string = path.join(buildDir, file);
            const stat: fs.Stats = fs.statSync(src);
            if (stat.isDirectory()) {
                fs.cpSync(src, dest, { recursive: true });
            } else {
                fs.copyFileSync(src, dest);
            }
        }
    };

    const copyFromSrc = (item: string): void => {
        const src: string = path.join(srcDir, item);
        if (fs.existsSync(src)) {
            const dest: string = path.join(buildDir, item);
            const stat: fs.Stats = fs.statSync(src);
            if (stat.isDirectory()) {
                fs.cpSync(src, dest, { recursive: true });
            } else {
                fs.copyFileSync(src, dest);
            }
        }
    };

    // Copy root docs and configs
    copyRootFile('README.md');
    copyRootFile('LICENSE.md');
    copyRootFile('LICENSE');
    copyRootFile('.env.example');
    copyRootFile('.gitignore');

    // Copy framework components from src directly into build root (without src directory)
    copyFromSrc('storage');
    copyFromSrc('public');
    copyFromSrc('resources');
    copyFromSrc('assistant');
    copyFromSrc('webpack.mix.ts');
    copyFromSrc('test');
    copyFromSrc('jest.config.ts');
    copyFromSrc('eslint.config.ts');
    copyFromSrc('tsconfig.json');
    copyFromSrc('app.ts');
    copyFromSrc('app');
    copyFromSrc('bootstrap');
    copyFromSrc('config');
    copyFromSrc('database');
    copyFromSrc('routes');

    console.log(`[build] Successfully prepared ${pubPkg.name}@${pubPkg.version} inside build/`);
}

preparePackage();
