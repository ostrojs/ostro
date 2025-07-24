module.exports = {

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
    'name': env('APP_NAME', 'Ostro'),

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
    'port': env('APP_PORT', 8080),

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
    'host': env('APP_HOST', '127.0.0.1'),

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
    'env': env('APP_ENV', 'production'),

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
    'debug': Boolean(env('APP_DEBUG', false)),

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
    'url': env('APP_URL', 'http://localhost'),

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
    'asset_url': env('ASSET_URL', null),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | The default timezone used by PHP’s date and time functions.
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
    'key': env('APP_KEY'),

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
        require('@ostro/auth/authServiceProvider'),
        require('@ostro/cache/cacheServiceProvider'),
        require('@ostro/foundation/providers/foundationServiceProvider'),
        require('@ostro/encryption/encryptionServiceProvider'),
        require('@ostro/filesystem/filesystemServiceProvider'),
        require('@ostro/session/sessionServiceProvider'),
        require('@ostro/cookie/cookieServiceProvider'),
        require('@ostro/validation/validationServiceProvider'),
        require('@ostro/view/viewServiceProvider'),
        require('@ostro/foundation/support/providers/consoleSupportServiceProvider'),
        require('@ostro/database/databaseServiceProvider'),
        require('~/app/providers/appServiceProvider'),
        require('~/app/providers/routeServiceProvider')
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
        'Route': require('@ostro/support/facades/route'),
        'Cache': require('@ostro/support/facades/cache'),
        'Storage': require('@ostro/support/facades/storage'),
        'Log': require('@ostro/support/facades/log'),
        'DB': require('@ostro/support/facades/database'),
        'Event': require('@ostro/support/facades/event'),
        'Hash': require('@ostro/support/facades/hash'),
        'Crypt': require('@ostro/support/facades/crypt')
    }

}
