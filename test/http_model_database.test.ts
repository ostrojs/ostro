import { describe, test, expect, beforeEach, afterEach, jest } from "@jest/globals";
import '@ostro/support/helpers';
import webRoutes from '../src/routes/web';
import apiRoutes from '../src/routes/api';
import Controller from '../src/app/http/controllers/controller';
import Authenticate from '../src/app/http/middleware/authenticate';
import RedirectIfAuthenticated from '../src/app/http/middleware/redirectIfAuthenticated';
import VerifyCsrfToken from '../src/app/http/middleware/verifyCsrfToken';
import HttpKernel from '../src/app/http/kernel';
import User from '../src/app/models/user';
import CreateUsersTables from '../src/database/migrations/2026_10_21_053500_create_users_tables';
import DatabaseSeeder from '../src/database/seeders/databaseSeeder';
import Facade from '@ostro/support/facades/facade';

describe('HTTP Routing, Middleware, Eloquent Model, and Database Suite', () => {
    let appMock: any;

    beforeEach(() => {
        appMock = {
            make: jest.fn(),
            hasBeenBootstrapped: jest.fn().mockReturnValue(true),
            bootstrapWith: jest.fn(),
            config: {
                'app.key': 'base64:testkey123456789012345678901234567890=',
                'app.cipher': 'AES-256-CBC'
            },
            'db.schema': {
                create: jest.fn(),
                dropIfExists: jest.fn()
            },
            encrypter: {
                encrypt: jest.fn((val) => 'enc_' + val)
            }
        };
        Facade.setFacadeApplication(appMock);
    });

    afterEach(() => {
        Facade.setFacadeApplication(null);
    });

    describe('Web and API Routes Comprehensive Tests', () => {
        test('web routes defines get / and executes view rendering', () => {
            const registered: Record<string, any> = {};
            const mockRoute: any = {
                get: jest.fn((p, handler) => {
                    registered[p] = handler;
                    return mockRoute;
                })
            };

            webRoutes(mockRoute);
            expect(mockRoute.get).toHaveBeenCalledWith('/', expect.any(Function));

            // Execute route
            const viewMock = jest.fn();
            registered['/']({ view: viewMock });
            expect(viewMock).toHaveBeenCalledWith('welcome');
        });

        test('api routes registers user endpoint with auth:api middleware', async () => {
            const middlewareSpy = jest.fn().mockReturnThis();
            let routeHandler: any = null;
            const mockRoute: any = {
                get: jest.fn((p, handler) => {
                    routeHandler = handler;
                    return { middleware: middlewareSpy };
                })
            };

            apiRoutes(mockRoute);
            expect(mockRoute.get).toHaveBeenCalledWith('user', expect.any(Function));
            expect(middlewareSpy).toHaveBeenCalledWith('auth:api');

            const mockUser = { id: 101, name: 'John Doe', email: 'john@example.com' };
            const req = {
                user: jest.fn().mockResolvedValue(mockUser)
            };
            const res = {
                send: jest.fn()
            };

            await routeHandler({ request: req, response: res });
            expect(req.user).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('Controller and Validation', () => {
        test('Controller handles validation through validatesRequests', async () => {
            const ctrl = new Controller();
            expect(ctrl).toBeDefined();

            const mockValidator = {
                validate: jest.fn().mockResolvedValue({ name: 'Valid User' })
            };
            (global as unknown as Record<string, unknown>).app = jest.fn((k) => (k === 'validation' ? mockValidator : null));

            const req = { all: () => ({ name: 'Valid User' }) };
            const result = await ctrl.validate(req, { name: 'required' });
            expect(result).toEqual({ name: 'Valid User' });
        });
    });

    describe('HTTP Middleware Chain', () => {
        test('RedirectIfAuthenticated redirects guest to /dashboard when user authenticated', () => {
            const middleware = new RedirectIfAuthenticated();
            expect(middleware.redirectTo()).toBe('/dashboard');
        });

        test('Authenticate middleware handles json requests and web redirects', () => {
            const authMiddleware = new Authenticate();
            expect(authMiddleware.redirectTo({ expectsJson: () => false })).toBe('/login');
            expect(authMiddleware.redirectTo({ expectsJson: () => true })).toBeUndefined();
        });

        test('VerifyCsrfToken middleware options and cookie defaults', () => {
            const csrf = new VerifyCsrfToken();
            expect(csrf.$addHttpCookie).toBe(true);
            expect(csrf.$cookieName).toBe('XSRF-TOKEN');
            expect(csrf.$except).toEqual([]);
        });

        test('HttpKernel middleware configuration and stack inspection', () => {
            HttpKernel.prototype.$app = appMock;
            const kernel = new HttpKernel();

            expect(kernel.$defaultMiddlewares).toHaveLength(8);
            expect(kernel.$middlewareGroups).toHaveProperty('web');
            expect(kernel.$namedMiddlewares).toHaveProperty('auth');
            expect(kernel.$namedMiddlewares).toHaveProperty('guest');
        });
    });

    describe('Eloquent User Model Operations and Properties', () => {
        test('User model attributes, getters, and mutators', () => {
            const user = new User({
                name: 'Alice',
                email: 'alice@example.com',
                password: 'hashed_password_123',
                remember_token: 'token_abc',
                is_admin: true
            });

            expect(user.getFillable()).toContain('name');
            expect(user.getFillable()).toContain('email');
            expect(user.getFillable()).toContain('password');

            expect(user.getHidden()).toContain('password');
            expect(user.getHidden()).toContain('remember_token');
        });

        test('User createToken generates valid encrypted auth token', async () => {
            const user = new User();
            user.getKeyName = () => 'id';
            user.getAttribute = (attr: string) => (attr === 'id' ? 999 : null);
            user.setApiToken = jest.fn();
            user.save = jest.fn().mockResolvedValue(true);

            const tokenObj = await user.createToken();
            expect(tokenObj).toHaveProperty('accessToken');
            expect(tokenObj.accessToken.startsWith('enc_')).toBe(true);
            expect(user.setApiToken).toHaveBeenCalledWith(tokenObj.accessToken);
            expect(user.save).toHaveBeenCalled();
        });
    });

    describe('Database Migrations and Seeders Execution', () => {
        test('CreateUsersTables migration up and down schema definitions', async () => {
            const migration = new CreateUsersTables();

            let schemaCallback: any = null;
            appMock['db.schema'].create.mockImplementation(async (table: string, cb: Function) => {
                schemaCallback = cb;
            });

            await migration.up();
            expect(appMock['db.schema'].create).toHaveBeenCalledWith('users', expect.any(Function));

            // Execute schema callback to test blueprint definitions
            const mockBlueprint = {
                increments: jest.fn().mockReturnValue({ primary: jest.fn() }),
                string: jest.fn().mockReturnValue({ unique: jest.fn() }),
                timestamps: jest.fn()
            };
            schemaCallback(mockBlueprint);

            expect(mockBlueprint.increments).toHaveBeenCalledWith('id');
            expect(mockBlueprint.string).toHaveBeenCalledWith('name');
            expect(mockBlueprint.string).toHaveBeenCalledWith('email');
            expect(mockBlueprint.string).toHaveBeenCalledWith('password');
            expect(mockBlueprint.string).toHaveBeenCalledWith('remember_token');
            expect(mockBlueprint.string).toHaveBeenCalledWith('api_token');
            expect(mockBlueprint.timestamps).toHaveBeenCalled();

            await migration.down();
            expect(appMock['db.schema'].dropIfExists).toHaveBeenCalledWith('users');
        });

        test('DatabaseSeeder runs without exceptions', async () => {
            const seeder = new DatabaseSeeder();
            await expect(seeder.run()).resolves.toBeUndefined();
        });
    });
});
