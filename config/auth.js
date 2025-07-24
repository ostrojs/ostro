module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | Controls the default authentication guard and password reset options.
    | You can modify these defaults to suit your app's needs.
    | The default guard is used for all authentication requests unless overridden.
    |
    */
    'defaults': {
        'guard': 'web', // Default guard for handling authentication (session-based)
    },

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Defines all authentication guards available in your application.
    | Guards specify how users are authenticated for each request.
    | Examples include session-based or token-based authentication.
    | Each guard references a user provider which retrieves the user info.
    |
    | Supported drivers: "session" (stateful), "token" (stateless API tokens)
    |
    */
    'guards': {

        'web': {
            'driver': 'session', // Maintains user state via sessions (for web apps)
            'provider': 'users', // Specifies which user provider to use for fetching user info
        },

        'api': {
            'driver': 'token', // Uses tokens for stateless API authentication
            'provider': 'users', // Uses the same user provider as 'web'
            'hash': false, // Token hashing disabled (not recommended for production)
        },
    },

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | Defines how user data is retrieved from storage.
    | Can be connected to a database or ORM model.
    | You may configure multiple providers if you have different user types.
    |
    | Supported drivers: "database" (direct DB queries), "eloquent" (ORM models)
    |
    */
    'providers': {

        'users': {
            'driver': 'eloquent', // Uses ORM models to fetch users
            'model': require('~/app/models/user'), // Path to the user model class
        },

    }

};
