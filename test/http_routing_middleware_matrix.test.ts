import { describe, test, expect, beforeEach, afterEach, jest } from "@jest/globals";
import Controller from '../src/app/http/controllers/controller';
import Authenticate from '../src/app/http/middleware/authenticate';
import RedirectIfAuthenticated from '../src/app/http/middleware/redirectIfAuthenticated';
import VerifyCsrfToken from '../src/app/http/middleware/verifyCsrfToken';
import RouteServiceProvider from '../src/app/providers/routeServiceProvider';
import AppServiceProvider from '../src/app/providers/appServiceProvider';
import Handler from '../src/app/exceptions/handler';
import Facade from '@ostro/support/facades/facade';

describe('HTTP, Routing, Middleware, and Controllers Combinatorial Test Suite', () => {
    let appMock: any;

    beforeEach(() => {
        appMock = {
            hasBeenBootstrapped: jest.fn().mockReturnValue(true),
            bootstrapWith: jest.fn(),
            router: {
                prefix: jest.fn().mockReturnThis(),
                middleware: jest.fn().mockReturnThis(),
                namespace: jest.fn().mockReturnThis(),
                group: jest.fn().mockReturnThis()
            }
        };
        Facade.setFacadeApplication(appMock);
    });

    afterEach(() => {
        Facade.setFacadeApplication(null);
    });

    describe('Controller validation positive, negative, and edge matrices', () => {
        const validationScenarios = [
            { desc: 'valid standard fields', data: { name: 'John', email: 'john@example.com' }, rules: { name: 'required', email: 'required|email' }, shouldPass: true },
            { desc: 'missing required field', data: { email: 'john@example.com' }, rules: { name: 'required' }, shouldPass: false },
            { desc: 'empty string value for required', data: { name: '' }, rules: { name: 'required' }, shouldPass: false },
            { desc: 'null value for required', data: { name: null }, rules: { name: 'required' }, shouldPass: false },
            { desc: 'undefined value for required', data: {}, rules: { name: 'required' }, shouldPass: false },
            { desc: 'nested object validation payload', data: { user: { profile: { age: 25 } } }, rules: { 'user.profile.age': 'required|numeric' }, shouldPass: true },
            { desc: 'array input data', data: { tags: ['tech', 'news'] }, rules: { tags: 'required|array' }, shouldPass: true },
            { desc: 'special characters in fields', data: { desc: '<script>alert("xss")</script>' }, rules: { desc: 'required' }, shouldPass: true }
        ];

        validationScenarios.forEach(({ desc, data, rules, shouldPass }) => {
            test(`Controller validate scenario: ${desc}`, async () => {
                const ctrl = new Controller();
                const mockValidator = {
                    validate: jest.fn().mockImplementation((input, r) => {
                        if (shouldPass) return Promise.resolve(input);
                        return Promise.reject(new Error(`Validation failed for ${desc}`));
                    })
                };
                (global as unknown as Record<string, unknown>).app = jest.fn((k) => (k === 'validation' ? mockValidator : null));

                const req = { all: () => data };
                if (shouldPass) {
                    const result = await ctrl.validate(req, rules);
                    expect(result).toEqual(data);
                } else {
                    await expect(ctrl.validate(req, rules)).rejects.toThrow(`Validation failed for ${desc}`);
                }
            });
        });

        test('Controller validateWithBag handles custom bags and error attachments', async () => {
            const ctrl = new Controller();
            const mockValidator = {
                validate: jest.fn().mockRejectedValue(new Error('Form error'))
            };
            (global as unknown as Record<string, unknown>).app = jest.fn((k) => (k === 'validation' ? mockValidator : null));

            const req = { all: () => ({ username: '' }) };
            await expect(ctrl.validateWithBag('loginForm', req, { username: 'required' })).rejects.toThrow('Form error');
        });
    });

    describe('Middleware Matrix (Authenticate, RedirectIfAuthenticated, VerifyCsrfToken)', () => {
        describe('Authenticate middleware', () => {
            const requests = [
                { desc: 'HTML web browser request', expectsJson: false, expected: '/login' },
                { desc: 'API JSON request', expectsJson: true, expected: undefined },
                { desc: 'HTML request with accepts header', expectsJson: false, expected: '/login' }
            ];

            requests.forEach(({ desc, expectsJson, expected }) => {
                test(`Authenticate redirectTo for ${desc}`, () => {
                    const auth = new Authenticate();
                    const req = { expectsJson: () => expectsJson };
                    expect(auth.redirectTo(req as unknown as import("@ostro/http/request").Request)).toBe(expected);
                });
            });
        });

        describe('RedirectIfAuthenticated middleware', () => {
            test('redirects to /dashboard for authenticated users', () => {
                const redirect = new RedirectIfAuthenticated();
                expect(redirect.redirectTo()).toBe('/dashboard');
            });
        });

        describe('VerifyCsrfToken middleware configuration', () => {
            test('cookie name and httpOnly defaults', () => {
                const csrf = new VerifyCsrfToken();
                expect(csrf.$cookieName).toBe('XSRF-TOKEN');
                expect(csrf.$addHttpCookie).toBe(true);
                expect(csrf.$except).toEqual([]);

                // Add exceptions
                csrf.$except.push('/stripe/webhook', '/api/*');
                expect(csrf.$except).toHaveLength(2);
                expect(csrf.$except).toContain('/stripe/webhook');
            });
        });
    });

    describe('Routing and Service Provider Integration', () => {
        test('RouteServiceProvider boots and calls mapWebRoutes and mapApiRoutes', () => {
            const provider = new RouteServiceProvider(appMock);
            const mapSpy = jest.spyOn(provider, 'map');
            provider.boot();
            expect(mapSpy).toHaveBeenCalled();

            expect(appMock.router.prefix).toHaveBeenCalledWith('api');
            expect(appMock.router.middleware).toHaveBeenCalledWith('web');
        });

        test('AppServiceProvider registers without errors', () => {
            const provider = new AppServiceProvider(appMock);
            expect(provider).toBeInstanceOf(AppServiceProvider);
        });

        test('Handler exception reporting and dontFlash configuration', () => {
            const handler = new Handler({});
            expect(handler.$dontReport).toEqual([]);
            expect(handler.$dontFlash).toEqual([
                'current_password',
                'password',
                'password_confirmation'
            ]);
        });
    });
});
