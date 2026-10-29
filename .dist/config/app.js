"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("@ostro/support/function");
const authServiceProvider_1 = __importDefault(require("@ostro/auth/authServiceProvider"));
const cacheServiceProvider_1 = __importDefault(require("@ostro/cache/cacheServiceProvider"));
const foundationServiceProvider_1 = __importDefault(require("@ostro/foundation/providers/foundationServiceProvider"));
const encryptionServiceProvider_1 = __importDefault(require("@ostro/encryption/encryptionServiceProvider"));
const filesystemServiceProvider_1 = __importDefault(require("@ostro/filesystem/filesystemServiceProvider"));
const sessionServiceProvider_1 = __importDefault(require("@ostro/session/sessionServiceProvider"));
const cookieServiceProvider_1 = __importDefault(require("@ostro/cookie/cookieServiceProvider"));
const validationServiceProvider_1 = __importDefault(require("@ostro/validation/validationServiceProvider"));
const viewServiceProvider_1 = __importDefault(require("@ostro/view/viewServiceProvider"));
const consoleSupportServiceProvider_1 = __importDefault(require("@ostro/foundation/support/providers/consoleSupportServiceProvider"));
const databaseServiceProvider_1 = __importDefault(require("@ostro/database/databaseServiceProvider"));
const appServiceProvider_1 = __importDefault(require("~/app/providers/appServiceProvider"));
const routeServiceProvider_1 = __importDefault(require("~/app/providers/routeServiceProvider"));
const route_1 = __importDefault(require("@ostro/support/facades/route"));
const cache_1 = __importDefault(require("@ostro/support/facades/cache"));
const storage_1 = __importDefault(require("@ostro/support/facades/storage"));
const log_1 = __importDefault(require("@ostro/support/facades/log"));
const database_1 = __importDefault(require("@ostro/support/facades/database"));
const event_1 = __importDefault(require("@ostro/support/facades/event"));
const hash_1 = __importDefault(require("@ostro/support/facades/hash"));
const crypt_1 = __importDefault(require("@ostro/support/facades/crypt"));
const config = {
    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This key holds the name of your application. It is used throughout the
    | framework and any packages that require a reference to your app’s name.
    | For example, it might appear in email templates, notifications, or page titles.
    | Set this in your environment file with APP_NAME.
    |
    */
    'name': (0, function_1.env)('APP_NAME', 'Ostro'),
    /*
    |--------------------------------------------------------------------------
    | Application Port
    |--------------------------------------------------------------------------
    |
    | The network port number where your server will listen for incoming requests.
    | Usually set to 80 for HTTP or 443 for HTTPS in production, but defaults to 8080.
    | Can be customized per environment via APP_PORT.
    |
    */
    'port': (0, function_1.env)('APP_PORT', 8080),
    /*
    |--------------------------------------------------------------------------
    | Application Host
    |--------------------------------------------------------------------------
    |
    | The hostname or IP address that your server will bind to. This is usually
    | 'localhost' or '127.0.0.1' for development environments, but can be set
    | to a public IP or domain in production.
    |
    */
    'host': (0, function_1.env)('APP_HOST', '127.0.0.1'),
    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This setting defines the current runtime environment for your application.
    | Common values are 'production', 'development', or 'testing'.
    | It can be used to load environment-specific configurations or behaviors.
    |
    */
    'env': (0, function_1.env)('APP_ENV', 'production'),
    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When enabled (true), the application will display detailed error messages
    | and stack traces to aid debugging. It should always be disabled (false)
    | in production to avoid leaking sensitive information.
    |
    */
    'debug': Boolean((0, function_1.env)('APP_DEBUG', false)),
    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | The base URL for your application. This is used for generating
    | links within the app and for console commands that require a URL.
    | Should be set to the public-facing URL of your site.
    |
    */
    'url': (0, function_1.env)('APP_URL', 'http://localhost'),
    /*
    |--------------------------------------------------------------------------
    | Application Asset URL
    |--------------------------------------------------------------------------
    |
    | Optional base URL to serve your assets (CSS, JS, images).
    | If set, asset URLs generated will be prefixed with this value.
    | Useful if you serve assets from a CDN or different domain.
    |
    */
    'asset_url': (0, function_1.env)('ASSET_URL', null),
    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | The default timezone used by application date and time functions.
    | This affects how dates are formatted and manipulated within your app.
    | Defaults to UTC for portability but can be set to your local timezone.
    |
    */
    'timezone': 'UTC',
    /*
    |--------------------------------------------------------------------------
    | Application Locale
    |--------------------------------------------------------------------------
    |
    | The default locale determines the language for translation strings,
    | formatting of dates, numbers, etc. Set this to the primary language of your app.
    |
    */
    'locale': 'en',
    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | If the current locale is not available, this fallback locale will be used.
    | It ensures your app can still display content even if a translation is missing.
    |
    */
    'fallback_locale': 'en',
    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | This key is used by the encryption service to secure sensitive data.
    | It must be a random, 32-character string and kept secret.
    | Without it, encrypted data will not be safe.
    |
    */
    'key': (0, function_1.env)('APP_KEY'),
    /*
    |--------------------------------------------------------------------------
    | Encryption Cipher
    |--------------------------------------------------------------------------
    |
    | Specifies the cipher algorithm used for encryption.
    | AES-256-CBC is a strong and widely used symmetric encryption standard.
    |
    */
    'cipher': 'AES-256-CBC',
    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | An array of service provider modules that are automatically loaded on app boot.
    | These providers register bindings, event listeners, middleware, and more.
    | You can add your own providers here to extend the framework’s functionality.
    |
    */
    'providers': [
        authServiceProvider_1.default,
        cacheServiceProvider_1.default,
        foundationServiceProvider_1.default,
        encryptionServiceProvider_1.default,
        filesystemServiceProvider_1.default,
        sessionServiceProvider_1.default,
        cookieServiceProvider_1.default,
        validationServiceProvider_1.default,
        viewServiceProvider_1.default,
        consoleSupportServiceProvider_1.default,
        databaseServiceProvider_1.default,
        appServiceProvider_1.default,
        routeServiceProvider_1.default,
    ],
    /*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array defines convenient class aliases (facades) for core services.
    | They are lazy loaded and allow easy access to common services like routing,
    | caching, storage, logging, and more without importing classes everywhere.
    |
    */
    'aliases': {
        'Route': route_1.default,
        'Cache': cache_1.default,
        'Storage': storage_1.default,
        'Log': log_1.default,
        'DB': database_1.default,
        'Event': event_1.default,
        'Hash': hash_1.default,
        'Crypt': crypt_1.default,
    },
};
exports.default = config;
