module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Cache Store
    |--------------------------------------------------------------------------
    |
    | This key specifies the default cache driver/store your application
    | will use when performing caching operations, unless explicitly overridden.
    | The value should correspond to one of the keys defined in the 'stores' object.
    |
    */
    'default': env('CACHE_DRIVER', 'file'),

    /*
    |--------------------------------------------------------------------------
    | Cache Enablement Flag
    |--------------------------------------------------------------------------
    |
    | Globally enables or disables caching throughout the application.
    | When set to false, caching logic will be bypassed entirely.
    |
    */
    'enabled': env('CACHE_ENABLE', true),

    /*
    |--------------------------------------------------------------------------
    | Cache Stores Configuration
    |--------------------------------------------------------------------------
    |
    | Defines multiple cache stores that your application can use.
    | Each store specifies a driver and driver-specific configuration options.
    | You can switch between stores by changing the 'default' setting or 
    | specify a store for individual caching needs.
    |
    | Supported drivers include: "memory", "database", "file", "redis", "memcached".
    |
    */
    'stores': {
        
        'memory': {
            'driver': 'memory',  // Fast in-memory caching; non-persistent (lost on restart)
        },

        'database': {
            'driver': 'database',  // Caches data in a database table
            'table': 'caches',     // Table name where cache entries are stored
            'connection': null,    // Database connection name; null uses default
        },

        'file': {
            'driver': 'file',  // Stores cache items as files on disk
            'path': storage_path('framework/cache/data'), // Directory to store cache files
        },

        'session': {
            'stores': env('CACHE_DRIVER', 'file'),  // Uses session storage for caching
            'path': storage_path('framework/sessions'), // Path where session files are saved
        },

        'redis': {
            'driver': 'redis',  // Uses Redis key-value store for caching
            'server': {
                'host': env('REDIS_HOST', 'localhost'),     // Redis server hostname/IP
                'port': env('REDIS_PORT', 13002),           // Redis port number
                'password': env('REDIS_PASSWORD'),           // Password if Redis is secured
                'user': env('REDIS_USERNAME'),               // Optional Redis username
            }
        },

        'memcached': {
            'driver': 'memcached',  // Uses Memcached server for caching
            'persistent_id': env('MEMCACHED_PERSISTENT_ID'),  // Optional persistent connection ID

            'options': {},  // Extra Memcached client options (e.g., compression, timeout)
            'server': {
                'host': env('MEMCACHED_HOST', '127.0.0.1'),  // Memcached server IP/hostname
                'port': env('MEMCACHED_PORT', 11211),        // Memcached listening port
                'weight': 100,                                // Weight for load balancing
                'user': env('MEMCACHED_USERNAME'),            // Optional username for auth
                'password': env('MEMCACHED_PASSWORD'),        // Optional password for auth
            },
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Cache Key Prefix
    |--------------------------------------------------------------------------
    |
    | Prefix added to all cache keys to avoid collisions when multiple applications
    | or environments share the same cache store.
    |
    */
    'prefix': env('CACHE_PREFIX', env('APP_NAME', 'ostro') + '_cache'),

}
