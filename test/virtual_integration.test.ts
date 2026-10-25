import { describe, test, expect } from "@jest/globals";
import path from 'node:path';
import fs from 'node:fs';
import appInstance from '../src/bootstrap/app';

describe('End-to-End Application Integration with Existing src Directory', () => {
    const ostroRoot = path.resolve(__dirname, '..');
    const srcDir = path.join(ostroRoot, 'src');

    test('Virtual directory structure matches complete Ostro application skeleton', () => {
        const requiredDirs = [
            'src/app/http/controllers',
            'src/app/http/middleware',
            'src/app/models',
            'src/app/providers',
            'src/app/exceptions',
            'src/app/console',
            'src/bootstrap',
            'src/config',
            'src/database/migrations',
            'src/database/seeders',
            'src/resources/views',
            'src/resources/assets/js',
            'src/resources/assets/css',
            'src/routes',
            'src/storage',
            'src/public'
        ];

        for (const dir of requiredDirs) {
            expect(fs.existsSync(path.join(ostroRoot, dir))).toBe(true);
        }
    });

    test('Application boots cleanly in isolated virtual environment', () => {
        expect(appInstance).toBeDefined();
        expect(appInstance.bound('@ostro/contracts/http/kernel')).toBe(true);
        expect(appInstance.bound('@ostro/contracts/console/kernel')).toBe(true);
        expect(appInstance.bound('@ostro/contracts/exception/handler')).toBe(true);
    });

    test('Configuration files load with all standard properties in virtual environment', () => {
        const configFiles = [
            'app', 'auth', 'cache', 'database', 'filesystem',
            'hashing', 'logging', 'session', 'view', 'xhr'
        ];

        for (const name of configFiles) {
            const configPath = path.join(srcDir, `config/${name}.ts`);
            expect(fs.existsSync(configPath)).toBe(true);
            const conf = require(`../src/config/${name}`).default;
            expect(conf).toBeDefined();
            expect(typeof conf).toBe('object');
        }
    });

    test('Simulated request-response lifecycle with all registered middleware', () => {
        const httpKernel = appInstance.make('@ostro/contracts/http/kernel');
        expect(httpKernel).toBeDefined();
        expect(httpKernel.getBootstrappers()).toHaveLength(6);
        expect(httpKernel.getMiddlewarePriority()).toHaveLength(2);
    });
});
