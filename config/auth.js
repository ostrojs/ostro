module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | Defines the default authentication guard and password reset options.
    | The guard determines how users are authenticated for each request.
    | By default, this is set to 'web', which typically uses session-based auth.
    | You can change this to another guard like 'api' if needed.
    |
    */
    'defaults': {
        'guard': 'web',
    },

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Guards define how users are authenticated for each request.
    | Each guard uses a driver like 'session' or 'token' and a user provider.
    | 'session' guard is for typical web authentication via sessions.
    | 'token' guard is usually for API authentication using tokens.
    | You can define multiple guards if your app requires different auth methods.
    |
    */
    'guards': {

        'web': {
            'driver': 'session',      // Uses session storage to maintain login state
            'provider': 'users',      // User provider that retrieves users for this guard
        },

        'api': {
            'driver': 'token',        // Uses token-based authentication (e.g., API tokens)
            'provider': 'users',
            'hash': false,            // Whether to hash API tokens before comparison
        },
    },

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | User providers define how user data is retrieved from your data source.
    | This can be via an ORM model (like Eloquent) or direct database queries.
    | You can configure multiple providers if you have different user tables/models.
    | Each guard references one of these providers to fetch user info.
    |
    */
    'providers': {

        'users': {
            'driver': 'eloquent',        // Uses an ORM model to retrieve users
            'model': require('~/app/models/user'),  // Path to the User model class
        },

    }

};