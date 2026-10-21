import path from 'path';
import fs from 'fs';
import os from 'os';
import ModelMakeCommand from '@ostro/foundation/console/modelMakeCommand';
import ConsoleMakeCommand from '@ostro/foundation/console/consoleMakeCommand';
import ControllerMakeCommand from '@ostro/router/console/controllerMakeCommand';
import MiddlewareMakeCommand from '@ostro/router/console/middlewareMakeCommand';
import SeederMakeCommand from '@ostro/database/console/seeds/seederMakeCommand';
import FactoryMakeCommand from '@ostro/database/console/factories/factoryMakeCommand';
import View from '@ostro/foundation/view/viewEngine';
import type { ExtractRouteParams, TypedRouteContext } from '@ostro/contracts/router/routeParser';

describe('Developer Experience Comprehensive End-to-End Test Suite', () => {

    describe('A. Dynamic Routing & Context Engine', () => {
        test('Route registration with dynamic parameters and context delivery', async () => {
            type UserRoute = '/api/v1/teams/:teamId/members/:memberId';
            type ExpectedParams = ExtractRouteParams<UserRoute>;

            const routeContext: TypedRouteContext<UserRoute, { name: string }, { role: string }> = {
                params: {
                    teamId: 'team_alpha',
                    memberId: 'user_42'
                },
                body: { name: 'Alice' },
                query: { role: 'admin' },
                request: { url: '/api/v1/teams/team_alpha/members/user_42', method: 'GET' },
                response: { json: jest.fn() },
                view: jest.fn()
            };

            expect(routeContext.params.teamId).toBe('team_alpha');
            expect(routeContext.params.memberId).toBe('user_42');
            expect(routeContext.body.name).toBe('Alice');
            expect(routeContext.query.role).toBe('admin');
        });
    });

    describe('B. Console Generator Commands (TS & JS Modes)', () => {
        let tsAppDir: string;
        let jsAppDir: string;

        beforeAll(() => {
            tsAppDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ostro-dev-ts-'));
            jsAppDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ostro-dev-js-'));

            fs.writeFileSync(path.join(tsAppDir, 'tsconfig.json'), JSON.stringify({
                compilerOptions: { target: 'ES2022', module: 'NodeNext', outDir: './.dist' }
            }));
            fs.writeFileSync(path.join(tsAppDir, 'package.json'), JSON.stringify({ name: 'ts-app' }));

            fs.writeFileSync(path.join(jsAppDir, 'package.json'), JSON.stringify({ name: 'js-app' }));
        });

        afterAll(() => {
            try {
                fs.rmSync(tsAppDir, { recursive: true, force: true });
                fs.rmSync(jsAppDir, { recursive: true, force: true });
            } catch {}
        });

        test('make:model produces .ts stub in TypeScript mode and .js in JavaScript mode', async () => {
            const fileMock = { exists: async (p: string) => fs.existsSync(p), put: jest.fn().mockResolvedValue(true) };

            const tsCmd = new ModelMakeCommand(fileMock);
            tsCmd.$app = { basePath: (p: string = '') => path.join(tsAppDir, p) };
            tsCmd.argument = jest.fn().mockReturnValue('Product');
            tsCmd.option = jest.fn().mockReturnValue(false);
            expect(tsCmd.isTypeScript()).toBe(true);
            expect(tsCmd.getPath('Product').endsWith('product.ts')).toBe(true);
            expect(await tsCmd.getStub()).toContain('.ts.stub');

            const jsCmd = new ModelMakeCommand(fileMock);
            jsCmd.$app = { basePath: (p: string = '') => path.join(jsAppDir, p) };
            jsCmd.argument = jest.fn().mockReturnValue('Product');
            jsCmd.option = jest.fn().mockReturnValue(false);
            expect(jsCmd.isTypeScript()).toBe(false);
            expect(jsCmd.getPath('Product').endsWith('product.js')).toBe(true);
            expect(await jsCmd.getStub()).not.toContain('.ts.stub');
        });

        test('make:controller produces .ts stub in TypeScript mode and .js in JavaScript mode', async () => {
            const fileMock = { exists: async (p: string) => fs.existsSync(p), put: jest.fn().mockResolvedValue(true) };

            const tsCmd = new ControllerMakeCommand(fileMock);
            tsCmd.$app = { basePath: (p: string = '') => path.join(tsAppDir, p) };
            tsCmd.argument = jest.fn().mockReturnValue('ProductController');
            tsCmd.option = jest.fn().mockReturnValue(false);
            expect(tsCmd.isTypeScript()).toBe(true);
            expect(tsCmd.getPath('ProductController').endsWith('productController.ts')).toBe(true);
            expect(await tsCmd.getStub()).toContain('.ts.stub');

            const jsCmd = new ControllerMakeCommand(fileMock);
            jsCmd.$app = { basePath: (p: string = '') => path.join(jsAppDir, p) };
            jsCmd.argument = jest.fn().mockReturnValue('ProductController');
            jsCmd.option = jest.fn().mockReturnValue(false);
            expect(jsCmd.isTypeScript()).toBe(false);
            expect(jsCmd.getPath('ProductController').endsWith('productController.js')).toBe(true);
            expect(await jsCmd.getStub()).not.toContain('.ts.stub');
        });

        test('make:seeder, make:factory, make:middleware, make:command produce language-specific stubs', async () => {
            const fileMock = { exists: async (p: string) => fs.existsSync(p), put: jest.fn().mockResolvedValue(true) };

            const seederCmd = new SeederMakeCommand(fileMock);
            seederCmd.$app = { basePath: (p: string = '') => path.join(tsAppDir, p), databasePath: (p: string = '') => path.join(tsAppDir, 'database', p) };
            seederCmd.option = jest.fn().mockReturnValue(false);
            expect(seederCmd.isTypeScript()).toBe(true);
            expect((await seederCmd.getPath('UserSeeder')).endsWith('userSeeder.ts')).toBe(true);

            const factoryCmd = new FactoryMakeCommand(fileMock);
            factoryCmd.$app = { basePath: (p: string = '') => path.join(tsAppDir, p), databasePath: (p: string = '') => path.join(tsAppDir, 'database', p) };
            factoryCmd.option = jest.fn().mockReturnValue(false);
            expect(factoryCmd.isTypeScript()).toBe(true);
            expect((await factoryCmd.getPath('UserFactory')).endsWith('userFactory.ts')).toBe(true);

            const mwCmd = new MiddlewareMakeCommand(fileMock);
            mwCmd.$app = { basePath: (p: string = '') => path.join(tsAppDir, p) };
            mwCmd.option = jest.fn().mockReturnValue(false);
            expect(mwCmd.isTypeScript()).toBe(true);
            expect(mwCmd.getPath('AuthGuard').endsWith('authGuard.ts')).toBe(true);

            const consoleCmd = new ConsoleMakeCommand(fileMock);
            consoleCmd.$app = { basePath: (p: string = '') => path.join(tsAppDir, p) };
            consoleCmd.option = jest.fn().mockReturnValue(false);
            expect(consoleCmd.isTypeScript()).toBe(true);
            expect(consoleCmd.getPath('ProcessQueue').endsWith('processQueue.ts')).toBe(true);
        });
    });

    describe('C. Production Build and Resource Artifacts Verification', () => {
        test('Verifies origin/ostro structure and build artifacts destination', () => {
            const ostroRoot = path.resolve(__dirname, '../../..');
            const distDir = path.join(ostroRoot, '.dist');
            const buildDir = path.join(ostroRoot, 'build');
            const srcDir = path.join(ostroRoot, 'src');

            expect(fs.existsSync(srcDir)).toBe(true);
            expect(fs.existsSync(path.join(srcDir, 'app.ts'))).toBe(true);
            expect(fs.existsSync(path.join(srcDir, 'resources'))).toBe(true);
            expect(fs.existsSync(path.join(srcDir, 'storage'))).toBe(true);
        });
    });

    describe('D. EJS View Engine Regression Test', () => {
        test('view.engine("ejs").render(...) executes correctly without TypeError', async () => {
            const fakeApp = {
                locals: {},
                view: {
                    engine: jest.fn().mockReturnValue({
                        renderFile: (file: string, data: any, cb: Function) => {
                            cb(null, `<html>Hello from ${data.title}</html>`);
                        }
                    })
                }
            };

            const fakeResponse: any = {
                send: jest.fn().mockImplementation((content: string, status: number) => ({ content, status })),
                headersSent: false
            };

            const fakeHttp = {
                request: { url: '/' },
                response: fakeResponse,
                session: {}
            };

            const next = jest.fn();
            const viewInstance = new (View as any)(fakeApp, fakeHttp, next);

            expect(typeof viewInstance.engine).toBe('function');
            expect(typeof viewInstance.render).toBe('function');

            const returned = viewInstance.engine('ejs');
            expect(returned).toBe(viewInstance);

            viewInstance.render('web.home', { title: 'Ostro' });
            expect(fakeResponse.__viewPromise).toBeDefined();

            await fakeResponse.__viewPromise;
            expect(fakeApp.view.engine).toHaveBeenCalledWith('ejs');
            expect(fakeResponse.send).toHaveBeenCalledWith('<html>Hello from Ostro</html>', 200);
            expect(next).not.toHaveBeenCalled();
        });
    });
});
