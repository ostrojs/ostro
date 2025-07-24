module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default cache requests
    |--------------------------------------------------------------------------
    |
    | This option defines the default cache stores that gets used when sending
    | data to the cache. The name specified in this option should match
    | one of the stores defined in the "stores" configuration json.
    |
    */
    'default': env('CACHE_DRIVER', 'file'), // Specifies the default cache store driver

    /*
    |--------------------------------------------------------------------------
    | Cache enable behavior
    |--------------------------------------------------------------------------
    |
    | This option defines to enable and disable cache.
    |
    */
    'enabled': env('CACHE_ENABLE', true), // Globally enables or disables caching in the app

    /*
    |--------------------------------------------------------------------------
    | Cache stores
    |--------------------------------------------------------------------------
    |
    | Here you may configure the cache stores for your application. 
    |
    | Available Drivers: "memory", "database", "file", "redis"
    |
    */
    'stores': {
        
        'memory': {
            'driver': 'memory', // In-memory store for fast, non-persistent caching
        },

        'database': {
            'driver': 'database', // Stores cache items in a database table
            'table': 'caches', // Table name for storing cache records
            'connection': null, // Optional: specify DB connection if not default
        },

        'file': {
            'driver': 'file', // Uses the local file system for caching
            'path': storage_path('framework/cache/data'), // Directory where cache files are stored
        },

        'session': {
            'stores': env('CACHE_DRIVER', 'file'), // Uses session-backed cache mechanism
            'path': storage_path('framework/sessions'), // Path where session data is cached
        },

        'redis': {
            'driver': 'redis', // Uses Redis server for caching
            'server': {
                'host': env('REDIS_HOST', 'localhost'), // Redis host name or IP
                'port': env('REDIS_PORT', 13002), // Redis server port
                'password': env('REDIS_PASSWORD'), // Redis password (if any)
                'user': env('REDIS_USERNAME'), // Optional Redis username
            }
        },

        'memcached': {
            'driver': 'memcached', // Uses Memcached server for high-performance caching
            'persistent_id': env('MEMCACHED_PERSISTENT_ID'), // Optional persistent ID

            'options': {}, // Additional Memcached options
            'server': {
                'host': env('MEMCACHED_HOST', '127.0.0.1'), // Memcached server host
                'port': env('MEMCACHED_PORT', 11211), // Memcached port
                'weight': 100, // Weight used for load balancing between servers
                'user': env('MEMCACHED_USERNAME'), // Optional Memcached username
                'password': env('MEMCACHED_PASSWORD'), // Optional Memcached password
            },
        }
    },

    'prefix': env('CACHE_PREFIX', env('APP_NAME', 'ostro') + '_cache'), // Prefix applied to all cache keys to avoid collisions
}
