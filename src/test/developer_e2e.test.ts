import path from 'path';
import fs from 'fs';
import os from 'os';
import ModelMakeCommand from '@ostro/foundation/console/modelMakeCommand';
import ConsoleMakeCommand from '@ostro/foundation/console/consoleMakeCommand';
import ControllerMakeCommand from '@ostro/router/console/controllerMakeCommand';
import MiddlewareMakeCommand from '@ostro/router/console/middlewareMakeCommand';
import SeederMakeCommand from '@ostro/database/console/seeds/seederMakeCommand';
import FactoryMakeCommand from '@ostro/database/console/factories/factoryMakeCommand';

describe('Developer End-to-End Application & Generator Suite', () => {
    describe('TypeScript Developer Workflow', () => {
        let tsAppDir: string;

        beforeAll(() => {
            tsAppDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ostro-dev-ts-'));
            fs.mkdirSync(path.join(tsAppDir, 'app', 'models'), { recursive: true });
            fs.mkdirSync(path.join(tsAppDir, 'app', 'http', 'controllers'), { recursive: true });
            fs.mkdirSync(path.join(tsAppDir, 'app', 'http', 'middleware'), { recursive: true });
            fs.mkdirSync(path.join(tsAppDir, 'app', 'console', 'commands'), { recursive: true });
            fs.mkdirSync(path.join(tsAppDir, 'database', 'migrations'), { recursive: true });
            fs.mkdirSync(path.join(tsAppDir, 'database', 'seeders'), { recursive: true });
            fs.mkdirSync(path.join(tsAppDir, 'database', 'factories'), { recursive: true });

            fs.writeFileSync(path.join(tsAppDir, 'tsconfig.json'), JSON.stringify({
                compilerOptions: {
                    target: 'ES2022',
                    module: 'NodeNext',
                    outDir: './.dist'
                }
            }, null, 2));

            fs.writeFileSync(path.join(tsAppDir, 'package.json'), JSON.stringify({
                name: 'test-ts-app',
                version: '1.0.0'
            }, null, 2));
        });

        afterAll(() => {
            try {
                fs.rmSync(tsAppDir, { recursive: true, force: true });
            } catch {}
        });

        test('Generates TypeScript models with .ts extension and TypeScript stub', async () => {
            const fileMock = {
                exists: async (p: string) => fs.existsSync(p),
                put: jest.fn().mockResolvedValue(true)
            };

            const cmd = new ModelMakeCommand(fileMock);
            cmd.$app = {
                basePath: (p: string = '') => path.join(tsAppDir, p),
                environmentFilePath: () => path.join(tsAppDir, '.env')
            };
            cmd.argument = jest.fn().mockReturnValue('Order');
            cmd.option = jest.fn().mockReturnValue(false);
            cmd.info = jest.fn();

            expect(cmd.isTypeScript()).toBe(true);
            const targetPath = cmd.getPath('Order');
            expect(targetPath.endsWith('order.ts')).toBe(true);

            const stub = await cmd.getStub();
            expect(stub).toContain('.ts.stub');
        });

        test('Generates TypeScript controllers with .ts extension and TypeScript stub', async () => {
            const fileMock = {
                exists: async (p: string) => fs.existsSync(p),
                put: jest.fn().mockResolvedValue(true)
            };

            const cmd = new ControllerMakeCommand(fileMock);
            cmd.$app = {
                basePath: (p: string = '') => path.join(tsAppDir, p)
            };
            cmd.argument = jest.fn().mockReturnValue('OrderController');
            cmd.option = jest.fn().mockReturnValue(false);
            cmd.info = jest.fn();

            expect(cmd.isTypeScript()).toBe(true);
            const targetPath = cmd.getPath('OrderController');
            expect(targetPath.endsWith('orderController.ts')).toBe(true);

            const stub = await cmd.getStub();
            expect(stub).toContain('.ts.stub');
        });

        test('Generates TypeScript migrations, seeders, and factories with .ts extension and TypeScript stub', async () => {
            const fileMock = {
                exists: async (p: string) => fs.existsSync(p),
                put: jest.fn().mockResolvedValue(true)
            };

            const seederCmd = new SeederMakeCommand(fileMock);
            seederCmd.$app = {
                basePath: (p: string = '') => path.join(tsAppDir, p),
                databasePath: (p: string = '') => path.join(tsAppDir, 'database', p)
            };
            seederCmd.option = jest.fn().mockReturnValue(false);
            expect(seederCmd.isTypeScript()).toBe(true);
            const seederPath = await seederCmd.getPath('OrderSeeder');
            expect(seederPath.endsWith('orderSeeder.ts')).toBe(true);

            const seederStub = await seederCmd.getStub();
            expect(seederStub).toContain('.ts.stub');

            const factoryCmd = new FactoryMakeCommand(fileMock);
            factoryCmd.$app = {
                basePath: (p: string = '') => path.join(tsAppDir, p),
                databasePath: (p: string = '') => path.join(tsAppDir, 'database', p)
            };
            factoryCmd.option = jest.fn().mockReturnValue(false);
            expect(factoryCmd.isTypeScript()).toBe(true);
            const factoryPath = await factoryCmd.getPath('OrderFactory');
            expect(factoryPath.endsWith('orderFactory.ts')).toBe(true);

            const factoryStub = await factoryCmd.getStub();
            expect(factoryStub).toContain('.ts.stub');
        });

        test('Generates TypeScript middleware and console commands with .ts extension and TypeScript stub', async () => {
            const fileMock = {
                exists: async (p: string) => fs.existsSync(p),
                put: jest.fn().mockResolvedValue(true)
            };

            const mwCmd = new MiddlewareMakeCommand(fileMock);
            mwCmd.$app = { basePath: (p: string = '') => path.join(tsAppDir, p) };
            mwCmd.option = jest.fn().mockReturnValue(false);
            expect(mwCmd.isTypeScript()).toBe(true);
            const mwPath = mwCmd.getPath('CheckPermission');
            expect(mwPath.endsWith('checkPermission.ts')).toBe(true);

            const mwStub = await mwCmd.getStub();
            expect(mwStub).toContain('.ts.stub');

            const consoleCmd = new ConsoleMakeCommand(fileMock);
            consoleCmd.$app = { basePath: (p: string = '') => path.join(tsAppDir, p) };
            consoleCmd.option = jest.fn().mockReturnValue(false);
            expect(consoleCmd.isTypeScript()).toBe(true);
            const consolePath = consoleCmd.getPath('SyncData');
            expect(consolePath.endsWith('syncData.ts')).toBe(true);

            const consoleStub = await consoleCmd.getStub();
            expect(consoleStub).toContain('.ts.stub');
        });
    });

    describe('JavaScript Developer Workflow', () => {
        let jsAppDir: string;

        beforeAll(() => {
            jsAppDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ostro-dev-js-'));
            fs.mkdirSync(path.join(jsAppDir, 'app', 'models'), { recursive: true });
            fs.mkdirSync(path.join(jsAppDir, 'app', 'http', 'controllers'), { recursive: true });
            fs.mkdirSync(path.join(jsAppDir, 'database', 'migrations'), { recursive: true });

            fs.writeFileSync(path.join(jsAppDir, 'package.json'), JSON.stringify({
                name: 'test-js-app',
                version: '1.0.0'
            }, null, 2));
        });

        afterAll(() => {
            try {
                fs.rmSync(jsAppDir, { recursive: true, force: true });
            } catch {}
        });

        test('Generates JavaScript models with .js extension and standard stubs', async () => {
            const fileMock = {
                exists: async (p: string) => fs.existsSync(p),
                put: jest.fn().mockResolvedValue(true)
            };

            const cmd = new ModelMakeCommand(fileMock);
            cmd.$app = {
                basePath: (p: string = '') => path.join(jsAppDir, p)
            };
            cmd.option = jest.fn().mockReturnValue(false);
            expect(cmd.isTypeScript()).toBe(false);
            const targetPath = cmd.getPath('Order');
            expect(targetPath.endsWith('order.js')).toBe(true);

            const stub = await cmd.getStub();
            expect(stub).not.toContain('.ts.stub');
            expect(stub.endsWith('.stub')).toBe(true);
        });

        test('Generates JavaScript controllers with .js extension and standard stubs', async () => {
            const fileMock = {
                exists: async (p: string) => fs.existsSync(p),
                put: jest.fn().mockResolvedValue(true)
            };

            const cmd = new ControllerMakeCommand(fileMock);
            cmd.$app = {
                basePath: (p: string = '') => path.join(jsAppDir, p)
            };
            cmd.option = jest.fn().mockReturnValue(false);
            expect(cmd.isTypeScript()).toBe(false);
            const targetPath = cmd.getPath('OrderController');
            expect(targetPath.endsWith('orderController.js')).toBe(true);

            const stub = await cmd.getStub();
            expect(stub).not.toContain('.ts.stub');
        });
    });
});
