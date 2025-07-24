module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Cache Store
    |--------------------------------------------------------------------------
    |
    | Specifies the default cache driver/store that the application
    | will use when caching data unless otherwise specified.
    | The driver name should match one of the defined stores below.
    |
    */
    'default': env('CACHE_DRIVER', 'file'), // Default cache store driver

    /*
    |--------------------------------------------------------------------------
    | Cache Enablement Flag
    |--------------------------------------------------------------------------
    |
    | Globally enables or disables caching in the application.
    | When set to false, cache operations will be bypassed.
    |
    */
    'enabled': env('CACHE_ENABLE', true), // Toggle caching on or off

    /*
    |--------------------------------------------------------------------------
    | Cache Stores Configuration
    |--------------------------------------------------------------------------
    |
    | Define the different cache stores your application supports.
    | Each store is configured with its own driver and related options.
    | Supported drivers include "memory", "database", "file", "redis", "memcached".
    |
    */
    'stores': {

        'memory': {
            'driver': 'memory', // In-memory cache; fast but not persistent
        },

        'database': {
            'driver': 'database', // Cache stored in a database table
            'table': 'caches', // Name of the table holding cached data
            'connection': null, // Optional: specify a particular database connection
        },

        'file': {
            'driver': 'file', // Uses local filesystem to store cache files
            'path': storage_path('framework/cache/data'), // Directory path for cache files
        },

        'session': {
            'stores': env('CACHE_DRIVER', 'file'), // Cache backed by session storage
            'path': storage_path('framework/sessions'), // Directory path for session files
        },

        'redis': {
            'driver': 'redis', // Uses Redis server for caching
            'server': {
                'host': env('REDIS_HOST', 'localhost'), // Redis hostname or IP
                'port': env('REDIS_PORT', 13002), // Redis port number
                'password': env('REDIS_PASSWORD'), // Redis password, if any
                'user': env('REDIS_USERNAME'), // Optional Redis username
            },
        },

        'memcached': {
            'driver': 'memcached', // Uses Memcached server for caching
            'persistent_id': env('MEMCACHED_PERSISTENT_ID'), // Optional persistent connection ID

            'options': {}, // Additional Memcached client options
            'server': {
                'host': env('MEMCACHED_HOST', '127.0.0.1'), // Memcached host
                'port': env('MEMCACHED_PORT', 11211), // Memcached port
                'weight': 100, // Load balancing weight for this server
                'user': env('MEMCACHED_USERNAME'), // Optional Memcached username
                'password': env('MEMCACHED_PASSWORD'), // Optional Memcached password
            },
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Cache Key Prefix
    |--------------------------------------------------------------------------
    |
    | This prefix is added to all cache keys to prevent collisions between
    | applications or different environments using the same cache store.
    |
    */
    'prefix': env('CACHE_PREFIX', env('APP_NAME', 'ostro') + '_cache'), // Cache key prefix

}
