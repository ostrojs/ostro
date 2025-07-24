module.exports =  {

    /*
    |--------------------------------------------------------------------------
    | Default Session Driver
    |--------------------------------------------------------------------------
    |
    | Specifies the session backend driver your app will use by default.
    | Options include: 'file' (stores sessions as files), 'database', 
    | 'cache', and 'memory'. You can configure the driver via env variable.
    |
    */
    'driver' : env('SESSION_DRIVER', 'file'),

    /*
    |--------------------------------------------------------------------------
    | Session Lifetime
    |--------------------------------------------------------------------------
    |
    | Defines how many minutes a session can remain idle before it expires.
    | If you want sessions to expire when the browser closes, use the
    | 'expire_on_close' option below.
    |
    */
    'lifetime' : env('SESSION_LIFETIME', 120),

    /*
    |--------------------------------------------------------------------------
    | Expire On Close
    |--------------------------------------------------------------------------
    |
    | If set to true, sessions expire immediately when the user closes their
    | browser, otherwise sessions will persist for the full lifetime.
    |
    */
    'expire_on_close' : false,

    /*
    |--------------------------------------------------------------------------
    | Session Encryption
    |--------------------------------------------------------------------------
    |
    | When enabled, all session data will be encrypted before storage.
    | This helps protect sensitive session data at rest.
    |
    */
    'encrypt' : false,

    /*
    |--------------------------------------------------------------------------
    | Signed Cookies
    |--------------------------------------------------------------------------
    |
    | If true, the session cookie will be cryptographically signed to prevent
    | tampering on the client side.
    |
    */
    'signed' : true,

    /*
    |--------------------------------------------------------------------------
    | Session File Location
    |--------------------------------------------------------------------------
    |
    | When using the 'file' session driver, this specifies the directory path
    | where session files will be stored.
    |
    */
    'files' : storage_path('framework/sessions'),

    /*
    |--------------------------------------------------------------------------
    | Session Database Connection
    |--------------------------------------------------------------------------
    |
    | When using database or redis drivers, specify which DB connection to use.
    | This should correspond to a connection defined in your database config.
    |
    */
    'connection' : env('SESSION_CONNECTION', null),

    /*
    |--------------------------------------------------------------------------
    | Session Database Table
    |--------------------------------------------------------------------------
    |
    | Defines the name of the database table that stores session records.
    | Only applicable if using the 'database' session driver.
    |
    */
    'table' : 'sessions',

    /*
    |--------------------------------------------------------------------------
    | Session Cache Store
    |--------------------------------------------------------------------------
    |
    | When using cache-based session drivers (like redis or memcached),
    | specify which cache store to use from your cache configuration.
    |
    */
    'store' : env('SESSION_STORE', null),

    /*
    |--------------------------------------------------------------------------
    | Session Sweeping Lottery
    |--------------------------------------------------------------------------
    |
    | Sessions stored on disk or in the database need to be cleaned up to
    | remove expired sessions. These values control the odds that cleanup
    | will occur on any given request. Defaults to 2% chance.
    |
    */
    'lottery' : [2, 100],

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Name
    |--------------------------------------------------------------------------
    |
    | The name of the cookie used to identify a session instance by its ID.
    | This cookie name is used regardless of which session driver you use.
    |
    */
    'cookie' : env('SESSION_COOKIE', env('APP_NAME', 'ostro') + '_session').toLowerCase(),

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Path
    |--------------------------------------------------------------------------
    |
    | Determines the path on the server for which the session cookie is valid.
    | Default is '/' which means the cookie is available site-wide.
    |
    */
    'path' : '/',

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Domain
    |--------------------------------------------------------------------------
    |
    | Defines the domain that the session cookie is available to.
    | Useful for sharing sessions across subdomains.
    |
    */
    'domain' : env('SESSION_DOMAIN', null),

    /*
    |--------------------------------------------------------------------------
    | HTTPS Only Cookies
    |--------------------------------------------------------------------------
    |
    | If true, the session cookie will only be sent over secure HTTPS
    | connections, enhancing security for sensitive data.
    |
    */
    'secure' : env('SESSION_SECURE_COOKIE', false),

    /*
    |--------------------------------------------------------------------------
    | HTTP Access Only
    |--------------------------------------------------------------------------
    |
    | Prevents JavaScript from accessing the session cookie to help mitigate
    | cross-site scripting (XSS) attacks. Should generally be set to true.
    |
    */
    'http_only' : true,

    /*
    |--------------------------------------------------------------------------
    | Same-Site Cookies
    |--------------------------------------------------------------------------
    |
    | Controls cross-site request behavior of the cookie, which helps
    | protect against CSRF attacks. Options: 'lax', 'strict', 'none', or null.
    |
    */
    'same_site' : 'lax',

    /*
    |--------------------------------------------------------------------------
    | Resave
    |--------------------------------------------------------------------------
    |
    | Controls whether the session is saved back to the session store even if
    | it wasn’t modified during the request. Typically set to false.
    |
    */
    'resave': false,

    /*
    |--------------------------------------------------------------------------
    | Save Uninitialized
    |--------------------------------------------------------------------------
    |
    | Determines whether to save a new but unmodified session to the store.
    | Defaults to true.
    |
    */
    'saveUninitialized': true,
    
};
