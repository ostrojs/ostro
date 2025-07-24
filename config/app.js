module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | The name of your application is represented by this value. When the framework
    | wants to place the application's name in a notice or any other location
    | specified by the application or its packages, this value is utilised.
    |
    */

    'name': env('APP_NAME', 'Ostro'),

    /*
    |--------------------------------------------------------------------------
    | Application Port
    |--------------------------------------------------------------------------
    |
    | Application needs to identify on which port server is running.
    |
    */

    'port': env('APP_PORT', 8080),

    /*
    |--------------------------------------------------------------------------
    | Application Host
    |--------------------------------------------------------------------------
    |
    | Application needs to identify on which host server is running.
    |
    */

    'host': env('APP_HOST', '127.0.0.1'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | The "environment" in which your programme is presently executing is
    | determined by this value. This may influence how you choose to setup
    | the application's various services. Make a note of it in your ".env" file.
    |
    */

    'env': env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your programme is in debug mode, it will display comprehensive error
    | messages with stack traces for any problem that happens. If this option is
    | deactivated, a generic error page is displayed.
    |
    */

    'debug': Boolean(env('APP_DEBUG', false)),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | When using the Assistant command line tool, the console uses this URL to
    | correctly create URLs. This should be set to the root of your application
    | so that it may be utilised when Assistant tasks are executed.
    |
    */

    'url': env('APP_URL', 'http://localhost'),

    /*
    |--------------------------------------------------------------------------
    | Application Asset URL
    |--------------------------------------------------------------------------
    |
    | Whenever you wanted to use asset_url helpers function in view you can
    | set you own asset url endpoint.
    |
    */

    'asset_url': env('ASSET_URL', null),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | The default timezone for your application, which will be utilised by the
    | NodeJS date and date-time functions, may be set here. We've set this to a
    | suitable setting for you right out of the box.
    |
    */

    'timezone': 'UTC',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The default locale used by the translation service provider is determined
    | by the application locale. You can set this value to any of the locations
    | that the programme will support.
    |
    */

    'locale': 'en',

    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | When the current locale is unavailable, the backup locale selects which
    | one to use. You can modify the value to match to any of the language
    | folders that your application provides.
    |
    */

    'fallback_locale': 'en',

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | The Ostro encrypter service uses this key, which should be configured
    | to a random 32-character string; otherwise, the encrypted texts will 
    | not be secure. Before deploying an application, please do this!
    |
    */

    'key': env('APP_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Encryption Cipher
    |--------------------------------------------------------------------------
    |
    | This defines the algorithm used by the encryption service.
    | AES-256-CBC is a widely trusted and secure encryption standard.
    |
    */
    'cipher': 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers mentioned here will be loaded automatically when
    | your application start. Feel free to add your own services
    | to this list to give your apps more functionality.
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
    | be registered. However, you are free to register as many as you like
    | because the aliases are "lazy" loaded and will not slow down your computer.
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
