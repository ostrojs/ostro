module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | The name of your application is represented by this value. When the framework
    | wants to place the application's name in a notice or any other location
    | specified by the application or its packages, this value is utilised.
    | This can be used in logs, error messages, or UI components.
    |
    */

    'name': env('APP_NAME', 'Ostro'),

    /*
    |--------------------------------------------------------------------------
    | Application Port
    |--------------------------------------------------------------------------
    |
    | Application needs to identify on which port the server is running.
    | This port is used by the HTTP server to listen for incoming requests.
    | You can configure this in your environment variables or use the default 8080.
    |
    */

    'port': env('APP_PORT', 8080),

    /*
    |--------------------------------------------------------------------------
    | Application Host
    |--------------------------------------------------------------------------
    |
    | Application needs to identify on which host or IP address the server is running.
    | By default, it is bound to localhost (127.0.0.1), but can be set to 0.0.0.0
    | to listen on all interfaces, useful for containerized or cloud deployments.
    |
    */

    'host': env('APP_HOST', '127.0.0.1'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | The "environment" in which your program is presently executing is
    | determined by this value. This may influence how you choose to setup
    | the application's various services such as logging levels, debugging,
    | or caching strategies. Common values include 'production', 'development', and 'testing'.
    | Make a note of it in your ".env" file.
    |
    */

    'env': env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your program is in debug mode, it will display comprehensive error
    | messages with stack traces for any problem that happens. If this option is
    | deactivated, a generic error page is displayed to avoid leaking sensitive
    | information in production environments.
    |
    */

    'debug': Boolean(env('APP_DEBUG', false)),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | When using the command line tools or generating URLs, this base URL is
    | used to build full URLs. This should be set to the root of your application
    | and can help when generating links or redirect URLs in your app.
    |
    */

    'url': env('APP_URL', 'http://localhost'),

    /*
    |--------------------------------------------------------------------------
    | Application Asset URL
    |--------------------------------------------------------------------------
    |
    | Whenever you want to use asset URL helper functions in views or other
    | components, you can set your own asset URL endpoint here. Useful if
    | you are serving static assets from a CDN or separate domain.
    |
    */

    'asset_url': env('ASSET_URL', null),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | The default timezone for your application, which will be utilized by the
    | NodeJS date and date-time functions like `new Date()`, or any date library
    | you might use (e.g. moment.js or dayjs). Set this to your preferred timezone.
    |
    */

    'timezone': 'UTC',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The default locale used by the translation or localization service provider
    | is determined by this value. This can be set to any supported locale your
    | application supports, such as 'en', 'fr', 'es', etc.
    |
    */

    'locale': 'en',

    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | When the current locale is unavailable or missing translations, the fallback
    | locale selects which one to use. This helps prevent missing language strings
    | and provides a consistent user experience.
    |
    */

    'fallback_locale': 'en',

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | The Ostro encrypter service uses this key, which should be configured
    | to a random 32-character string; otherwise, encrypted texts such as cookies,
    | session data, or sensitive information will not be secure.
    | Ensure this is set before deploying your application.
    |
    */

    'key': env('APP_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Cipher Algorithm
    |--------------------------------------------------------------------------
    |
    | The encryption cipher used by the encrypter service.
    | AES-256-CBC is a strong and widely supported encryption standard.
    |
    */

    'cipher': 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded when
    | your application starts. Feel free to add your own providers to extend
    | your app’s functionality, such as authentication, caching, session, etc.
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
    | When this application is started, this array of class aliases will
    | be registered. These aliases provide a convenient shortcut to access
    | commonly used classes or facades, without needing to import them repeatedly.
    | They are "lazy" loaded and will not slow down your application startup.
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
};
