require('@ostro/support/helpers');
const path = require('path');
const Facade = require('@ostro/support/facades/facade');

describe('Ostro App Skeleton Unit Tests', () => {
    let appMock;

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
            }
        };
        Facade.setFacadeApplication(appMock);
    });

    afterEach(() => {
        Facade.setFacadeApplication(null);
    });

    describe('Bootstrap and Application', () => {
        test('bootstrap/app.js creates and configures Application instance', () => {
            const app = require('../bootstrap/app');
            expect(app).toBeDefined();
            expect(typeof app.singleton).toBe('function');
            expect(typeof app.make).toBe('function');
            expect(app.basePath()).toBe(path.resolve(__dirname, '..'));

            // Verify singletons are bound in the container
            expect(app.bound('@ostro/contracts/http/kernel')).toBe(true);
            expect(app.bound('@ostro/contracts/console/kernel')).toBe(true);
            expect(app.bound('@ostro/contracts/exception/handler')).toBe(true);
        });
    });

    describe('Models', () => {
        test('User model has correct fillable and hidden attributes', () => {
            const User = require('../app/models/user');
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
            const origApp = global.app;
            global.app = jest.fn((key) => {
                if (key === 'logger') {
                    return {
                        error: jest.fn(),
                        channel: jest.fn(() => ({ error: jest.fn() }))
                    };
                }
                return null;
            });

            const Handler = require('../app/exceptions/handler');
            const handler = new Handler({});
            expect(handler.$dontReport).toEqual([]);
            expect(handler.$dontFlash).toEqual([
                'current_password',
                'password',
                'password_confirmation'
            ]);

            global.app = origApp;
        });
    });

    describe('Http Controllers and Middleware', () => {
        test('Controller base class instantiates and implements validatesRequests', () => {
            const Controller = require('../app/http/controllers/controller');
            const ctrl = new Controller();
            expect(ctrl).toBeDefined();
            expect(typeof ctrl.validate).toBe('function');
            expect(typeof ctrl.validateWithBag).toBe('function');
        });

        test('RedirectIfAuthenticated redirects to /dashboard', () => {
            const RedirectIfAuthenticated = require('../app/http/middleware/redirectIfAuthenticated');
            const middleware = new RedirectIfAuthenticated();
            expect(middleware.redirectTo()).toBe('/dashboard');
        });

        test('Authenticate middleware handles json and non-json requests', () => {
            const Authenticate = require('../app/http/middleware/authenticate');
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
            const VerifyCsrfToken = require('../app/http/middleware/verifyCsrfToken');
            const middleware = new VerifyCsrfToken();
            expect(middleware.$addHttpCookie).toBe(true);
            expect(middleware.$except).toEqual([]);
        });

        test('Http Kernel defines default middleware and groups', () => {
            const HttpKernel = require('../app/http/kernel');
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
            const ConsoleKernel = require('../app/console/kernel');
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
            const AppServiceProvider = require('../app/providers/appServiceProvider');
            const provider = new AppServiceProvider({});
            expect(provider).toBeDefined();
        });

        test('RouteServiceProvider maps web and api routes', () => {
            const RouteServiceProvider = require('../app/providers/routeServiceProvider');
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
            const webRoutes = require('../routes/web');
            let registeredHandler = null;
            const mockRoute = {
                get: jest.fn((path, handler) => {
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
            const apiRoutes = require('../routes/api');
            let registeredHandler = null;
            const mockRouteObj = {
                middleware: jest.fn().mockReturnThis()
            };
            const mockRoute = {
                get: jest.fn((path, handler) => {
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
            const DatabaseSeeder = require('../database/seeders/databaseSeeder');
            const seeder = new DatabaseSeeder();
            await expect(seeder.run()).resolves.toBeUndefined();
        });

        test('CreateUsersTables migration up and down execution', async () => {
            const CreateUsersTables = require('../database/migrations/2021_17_25_041757_create_users_tables');
            const migration = new CreateUsersTables();

            let tableCallback = null;
            appMock['db.schema'].create.mockImplementation(async (tableName, callback) => {
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
});
