import '@ostro/support/helpers';
import path from 'path';
import Facade from '@ostro/support/facades/facade';
import appInstance from '../bootstrap/app';
import User from '../app/models/user';
import Handler from '../app/exceptions/handler';
import Controller from '../app/http/controllers/controller';
import RedirectIfAuthenticated from '../app/http/middleware/redirectIfAuthenticated';
import Authenticate from '../app/http/middleware/authenticate';
import VerifyCsrfToken from '../app/http/middleware/verifyCsrfToken';
import HttpKernel from '../app/http/kernel';
import ConsoleKernel from '../app/console/kernel';
import AppServiceProvider from '../app/providers/appServiceProvider';
import RouteServiceProvider from '../app/providers/routeServiceProvider';
import webRoutes from '../routes/web';
import apiRoutes from '../routes/api';
import DatabaseSeeder from '../database/seeders/databaseSeeder';
import CreateUsersTables from '../database/migrations/2026_10_21_053500_create_users_tables';
import appConfig from '../config/app';
import authConfig from '../config/auth';
import cacheConfig from '../config/cache';
import databaseConfig from '../config/database';
import filesystemConfig from '../config/filesystem';
import hashingConfig from '../config/hashing';
import loggingConfig from '../config/logging';
import sessionConfig from '../config/session';
import viewConfig from '../config/view';
import xhrConfig from '../config/xhr';

describe('Ostro App Skeleton Unit Tests', () => {
    let appMock: any;

    beforeEach(() => {
        appMock = {
            make: jest.fn(),
            instance: jest.fn(),
            hasBeenBootstrapped: jest.fn().mockReturnValue(true),
            bootstrapWith: jest.fn(),
            loadDeferredProviders: jest.fn(),
            resolved: jest.fn().mockReturnValue(false),
            afterResolving: jest.fn(),
            router: {
                prefix: jest.fn().mockReturnThis(),
                middleware: jest.fn().mockReturnThis(),
                namespace: jest.fn().mockReturnThis(),
                group: jest.fn().mockReturnThis()
            },
            'db.schema': {
                create: jest.fn(),
                dropIfExists: jest.fn()
            },
            encrypter: {
                encrypt: jest.fn((val) => 'encrypted_' + val)
            }
        };
        Facade.setFacadeApplication(appMock);
    });

    afterEach(() => {
        Facade.setFacadeApplication(null);
    });

    describe('Bootstrap and Application', () => {
        test('bootstrap/app.js creates and configures Application instance', () => {
            expect(appInstance).toBeDefined();
            expect(typeof appInstance.singleton).toBe('function');
            expect(typeof appInstance.make).toBe('function');
            expect(appInstance.basePath()).toBe(process.cwd());

            // Verify singletons are bound in the container
            expect(appInstance.bound('@ostro/contracts/http/kernel')).toBe(true);
            expect(appInstance.bound('@ostro/contracts/console/kernel')).toBe(true);
            expect(appInstance.bound('@ostro/contracts/exception/handler')).toBe(true);
        });
    });

    describe('Models', () => {
        test('User model has correct fillable and hidden attributes', () => {
            const user = new User({
                name: 'Amar',
                email: 'amar@ostrojs.com',
                password: 'password123',
                remember_token: 'tok_abc'
            });

            expect(user.getFillable()).toEqual(['name', 'email', 'password']);
            expect(user.getHidden()).toEqual(['password', 'remember_token']);
        });
    });

    describe('Exceptions', () => {
        test('Handler exception class configuration', () => {
            const origApp = (global as any).app;
            (global as any).app = jest.fn((key: string) => {
                if (key === 'logger') {
                    return {
                        error: jest.fn(),
                        channel: jest.fn(() => ({ error: jest.fn() }))
                    };
                }
                return null;
            });

            const handler = new Handler({});
            expect(handler.$dontReport).toEqual([]);
            expect(handler.$dontFlash).toEqual([
                'current_password',
                'password',
                'password_confirmation'
            ]);

            (global as any).app = origApp;
        });
    });

    describe('Http Controllers and Middleware', () => {
        test('Controller base class instantiates and implements validatesRequests', () => {
            const ctrl = new Controller();
            expect(ctrl).toBeDefined();
            expect(typeof ctrl.validate).toBe('function');
            expect(typeof ctrl.validateWithBag).toBe('function');
        });

        test('RedirectIfAuthenticated redirects to /dashboard', () => {
            const middleware = new RedirectIfAuthenticated();
            expect(middleware.redirectTo()).toBe('/dashboard');
        });

        test('Authenticate middleware handles json and non-json requests', () => {
            const middleware = new Authenticate();

            // When request does not expect JSON
            const reqHtml = {
                expectsJson: () => false
            };
            expect(middleware.redirectTo(reqHtml)).toBe('/login');

            // When request expects JSON
            const reqJson = {
                expectsJson: () => true
            };
            expect(middleware.redirectTo(reqJson)).toBeUndefined();
        });

        test('VerifyCsrfToken middleware configuration', () => {
            const middleware = new VerifyCsrfToken();
            expect(middleware.$addHttpCookie).toBe(true);
            expect(middleware.$except).toEqual([]);
        });

        test('Http Kernel defines default middleware and groups', () => {
            HttpKernel.prototype.$app = appMock;

            const kernel = new HttpKernel();

            expect(kernel.$defaultMiddlewares).toBeInstanceOf(Array);
            expect(kernel.$defaultMiddlewares.length).toBe(8);

            expect(kernel.$middlewareGroups).toHaveProperty('web');
            expect(kernel.$middlewareGroups.web.length).toBe(3);

            expect(kernel.$namedMiddlewares).toHaveProperty('guest');
            expect(kernel.$namedMiddlewares).toHaveProperty('auth');
        });
    });

    describe('Console Kernel', () => {
        test('Console Kernel defines commands and registers them', () => {
            ConsoleKernel.prototype.$app = appMock;

            const kernel = new ConsoleKernel();
            expect(kernel.$commands).toEqual({});

            // Test commands method
            const loadSpy = jest.spyOn(kernel, 'load').mockImplementation(() => {});
            kernel.commands();
            expect(loadSpy).toHaveBeenCalledWith(path.resolve(__dirname, '../app/console/commands'));
            loadSpy.mockRestore();
        });
    });

    describe('Service Providers', () => {
        test('AppServiceProvider registers cleanly', () => {
            const provider = new AppServiceProvider({});
            expect(provider).toBeDefined();
        });

        test('RouteServiceProvider maps web and api routes', () => {
            const provider = new RouteServiceProvider({});

            const mapApiSpy = jest.spyOn(provider, 'mapApiRoutes').mockImplementation(() => {});
            const mapWebSpy = jest.spyOn(provider, 'mapWebRoutes').mockImplementation(() => {});

            provider.boot();
            expect(mapApiSpy).toHaveBeenCalled();
            expect(mapWebSpy).toHaveBeenCalled();

            mapApiSpy.mockRestore();
            mapWebSpy.mockRestore();

            // Test mapApiRoutes and mapWebRoutes directly with router facade
            const mockRouter = appMock.router;

            provider.mapApiRoutes();
            expect(mockRouter.prefix).toHaveBeenCalledWith('api');
            expect(mockRouter.namespace).toHaveBeenCalledWith(provider.$namespace);
            expect(mockRouter.group).toHaveBeenCalledWith(base_path('routes/api'));

            provider.mapWebRoutes();
            expect(mockRouter.middleware).toHaveBeenCalledWith('web');
            expect(mockRouter.namespace).toHaveBeenCalledWith(provider.$namespace);
            expect(mockRouter.group).toHaveBeenCalledWith(base_path('routes/web'));
        });
    });

    describe('Routes', () => {
        test('routes/web.js registers GET / route and executes handler', () => {
            let registeredHandler: any = null;
            const mockRoute: any = {
                get: jest.fn((path: string, handler: Function) => {
                    registeredHandler = handler;
                    return mockRoute;
                })
            };

            webRoutes(mockRoute);
            expect(mockRoute.get).toHaveBeenCalledWith('/', expect.any(Function));

            // Execute the route callback
            const mockView = jest.fn();
            registeredHandler({ view: mockView });
            expect(mockView).toHaveBeenCalledWith('welcome');
        });

        test('routes/api.js registers GET user route and executes handler', async () => {
            let registeredHandler: any = null;
            const mockRouteObj = {
                middleware: jest.fn().mockReturnThis()
            };
            const mockRoute: any = {
                get: jest.fn((path: string, handler: Function) => {
                    registeredHandler = handler;
                    return mockRouteObj;
                })
            };

            apiRoutes(mockRoute);
            expect(mockRoute.get).toHaveBeenCalledWith('user', expect.any(Function));
            expect(mockRouteObj.middleware).toHaveBeenCalledWith('auth:api');

            // Execute the route callback
            const mockUser = { id: 1, name: 'Alice' };
            const mockRequest = {
                user: jest.fn().mockResolvedValue(mockUser)
            };
            const mockResponse = {
                send: jest.fn()
            };

            await registeredHandler({ request: mockRequest, response: mockResponse });
            expect(mockRequest.user).toHaveBeenCalled();
            expect(mockResponse.send).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('Database Migrations and Seeders', () => {
        test('DatabaseSeeder run executes without error', async () => {
            const seeder = new DatabaseSeeder();
            await expect(seeder.run()).resolves.toBeUndefined();
        });

        test('CreateUsersTables migration up and down execution', async () => {
            const migration = new CreateUsersTables();

            let tableCallback: any = null;
            appMock['db.schema'].create.mockImplementation(async (tableName: string, callback: Function) => {
                tableCallback = callback;
            });

            // Run up
            await migration.up();
            expect(appMock['db.schema'].create).toHaveBeenCalledWith('users', expect.any(Function));

            // Exercise table definition callback
            const mockTable = {
                increments: jest.fn().mockReturnValue({ primary: jest.fn() }),
                string: jest.fn().mockReturnValue({ unique: jest.fn() }),
                timestamps: jest.fn()
            };
            tableCallback(mockTable);
            expect(mockTable.increments).toHaveBeenCalledWith('id');
            expect(mockTable.string).toHaveBeenCalledWith('name');
            expect(mockTable.string).toHaveBeenCalledWith('email');
            expect(mockTable.string).toHaveBeenCalledWith('remember_token');
            expect(mockTable.string).toHaveBeenCalledWith('api_token');
            expect(mockTable.string).toHaveBeenCalledWith('password');
            expect(mockTable.timestamps).toHaveBeenCalled();

            // Run down
            await migration.down();
            expect(appMock['db.schema'].dropIfExists).toHaveBeenCalledWith('users');
        });
    });

    describe('Configuration Files', () => {
        test('config files export valid configuration objects', () => {
            expect(appConfig.name).toBeDefined();
            expect(appConfig.providers).toBeInstanceOf(Array);
            expect(appConfig.aliases).toBeDefined();

            expect(authConfig.defaults.guard).toBe('web');
            expect(authConfig.guards.web).toBeDefined();
            expect(authConfig.providers.users).toBeDefined();

            expect(cacheConfig.default).toBeDefined();
            expect(cacheConfig.stores).toBeDefined();

            expect(databaseConfig.default).toBeDefined();
            expect(databaseConfig.connections).toBeDefined();

            expect(filesystemConfig.default).toBeDefined();
            expect(filesystemConfig.disks).toBeDefined();

            expect(hashingConfig.driver).toBeDefined();
            expect(hashingConfig.bcrypt).toBeDefined();

            expect(loggingConfig.default).toBeDefined();
            expect(loggingConfig.channels).toBeDefined();

            expect(sessionConfig.driver).toBeDefined();
            expect(sessionConfig.lifetime).toBeDefined();

            expect(viewConfig.default).toBeDefined();
            expect(viewConfig.engines).toBeDefined();

            expect(xhrConfig.default).toBeDefined();
            expect(xhrConfig.requests).toBeDefined();
        });
    });

    describe('Server Application Entrypoint', () => {
        test('app.ts configures and exports server', () => {
            const serverMock = {
                request: jest.fn(),
                response: jest.fn(),
                register: jest.fn(),
                start: jest.fn()
            };
            const kernelMock = {
                handle: jest.fn().mockReturnValue('kernel_handler')
            };

            const makeSpy = jest.spyOn(appInstance, 'make').mockImplementation((abstract: any, ...args: any[]) => {
                if (abstract === '@ostro/contracts/http/kernel') {
                    return kernelMock;
                }
                if (abstract === '@ostro/server') {
                    return serverMock;
                }
                return null;
            });

            try {
                const serverModule = require('../app');
                const server = serverModule.default || serverModule;

                expect(server).toBe(serverMock);
                expect(serverMock.request).toHaveBeenCalled();
                expect(serverMock.response).toHaveBeenCalled();
                expect(serverMock.register).toHaveBeenCalled();
                expect(serverMock.start).toHaveBeenCalled();
            } finally {
                makeSpy.mockRestore();
            }
        });
    });
});
