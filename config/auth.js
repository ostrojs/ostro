module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults': {
        'guard': 'web', // Default guard that will be used for authentication requests
    },

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | here which uses session storage and the Eloquent user provider.
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | Supported: "session", "token"
    |
    */

    'guards': {

        'web': {
            'driver': 'session', // Uses sessions to maintain user state
            'provider': 'users', // Refers to the provider that will fetch user data
        },

        'api': {
            'driver': 'token', // Uses simple token-based authentication
            'provider': 'users', // Shares the same provider as the 'web' guard
            'hash': false, // Disables hashing for tokens (not recommended for production)
        },
    },

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage
    | mechanisms used by this application to persist your user's data.
    |
    | If you have multiple user tables or models you may configure multiple
    | sources which represent each model / table. These sources may then
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers': {

        'users': {
            'driver': 'eloquent', // Indicates the use of Eloquent ORM for user retrieval
            'model': require('~/app/models/user'), // The model that represents application users
        },

    }

};
