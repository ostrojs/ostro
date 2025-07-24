module.exports =  {
    
    /*
    |--------------------------------------------------------------------------
    | Default Session Driver
    |--------------------------------------------------------------------------
    |
    | Controls the default session driver used for handling user sessions.
    | The default is a lightweight file-based driver, but others like
    | database, cache, or memory can be used.
    |
    | Supported: "file", "database", "cache", "memory"
    |
    */

    'driver' : env('SESSION_DRIVER', 'file'),

    /*
    |--------------------------------------------------------------------------
    | Session Lifetime
    |--------------------------------------------------------------------------
    |
    | The number of minutes a session can remain idle before it expires.
    | To expire sessions immediately on browser close, set 'expire_on_close'.
    |
    */

    'lifetime' : env('SESSION_LIFETIME', 120),

    'expire_on_close' : false,

    /*
    |--------------------------------------------------------------------------
    | Session Encryption
    |--------------------------------------------------------------------------
    |
    | If set to true, all session data will be encrypted before storage.
    | Encryption and decryption happen automatically.
    |
    */

    'encrypt' : false,

    'signed' : true,

    /*
    |--------------------------------------------------------------------------
    | Session File Location
    |--------------------------------------------------------------------------
    |
    | When using the file session driver, specify the directory for storing
    | session files. The default points to a folder inside storage.
    |
    */

    'files' : storage_path('framework/sessions'),

    /*
    |--------------------------------------------------------------------------
    | Session Database Connection
    |--------------------------------------------------------------------------
    |
    | When using database or redis drivers, specify the database connection
    | to use. Should match a connection in your database config.
    |
    */

    'connection' : env('SESSION_CONNECTION', null),

    /*
    |--------------------------------------------------------------------------
    | Session Database Table
    |--------------------------------------------------------------------------
    |
    | Table name used when using the database session driver.
    |
    */

    'table' : 'sessions',

    /*
    |--------------------------------------------------------------------------
    | Session Cache Store
    |--------------------------------------------------------------------------
    |
    | For cache-based session drivers, specify which cache store to use.
    | Must correspond to one of your configured cache stores.
    |
    | Supported cache stores: "apc", "dynamodb", "memcached", "redis"
    |
    */

    'store' : env('SESSION_STORE', null),

    /*
    |--------------------------------------------------------------------------
    | Session Sweeping Lottery
    |--------------------------------------------------------------------------
    |
    | Some session drivers require manual cleanup of old sessions.
    | This array defines the odds (chance) that the cleanup will run on
    | any given request, e.g., [2, 100] means 2% chance.
    |
    */

    'lottery' : [2, 100],

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Name
    |--------------------------------------------------------------------------
    |
    | The name of the cookie used to identify a session instance.
    | This is generated from your app name by default.
    |
    */

    'cookie' : env('SESSION_COOKIE', env('APP_NAME', 'ostro') + '_session').toLowerCase(),

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Path
    |--------------------------------------------------------------------------
    |
    | The path for which the session cookie is valid.
    | Defaults to root path '/'.
    |
    */

    'path' : '/',

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Domain
    |--------------------------------------------------------------------------
    |
    | The domain for the session cookie.
    | Defines which domains the cookie is available to.
    |
    */

    'domain' : env('SESSION_DOMAIN', null),

    /*
    |--------------------------------------------------------------------------
    | HTTPS Only Cookies
    |--------------------------------------------------------------------------
    |
    | If true, cookies will only be sent over HTTPS connections,
    | enhancing security.
    |
    */

    'secure' : env('SESSION_SECURE_COOKIE', false),

    /*
    |--------------------------------------------------------------------------
    | HTTP Access Only
    |--------------------------------------------------------------------------
    |
    | If true, prevents JavaScript from accessing the cookie.
    | The cookie is accessible only through HTTP(S) protocol.
    |
    */

    'http_only' : true,

    /*
    |--------------------------------------------------------------------------
    | Same-Site Cookies
    |--------------------------------------------------------------------------
    |
    | Controls cookie behavior during cross-site requests.
    | Helps mitigate CSRF attacks.
    | Supported values: "lax", "strict", "none", or null.
    |
    */

    'same_site' : 'lax',

    /*
    |--------------------------------------------------------------------------
    | Session Save Behavior (for express-session compatibility)
    |--------------------------------------------------------------------------
    |
    | 'resave': Forces session to be saved back to the session store,
    | even if it was never modified during the request.
    |
    | 'saveUninitialized': Forces uninitialized sessions to be saved.
    |
    */

    'resave': false,

    'saveUninitialized': true,
    
};
