module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default cache requests
    |--------------------------------------------------------------------------
    |
    | This option defines the default cache stores that gets used when sending
    | data to the cache. The name specified in this option should match
    | one of the stores defined in the "storess" configuration json.
    |
    */
    'default': env('CACHE_DRIVER', 'file'),

    /*
    |--------------------------------------------------------------------------
    | Cache enable behavior
    |--------------------------------------------------------------------------
    |
    | This option defines to enable and disable cache.
    |
    */
    'enabled': env('CACHE_ENABLE', true),

    /*
    |--------------------------------------------------------------------------
    | cache storess
    |--------------------------------------------------------------------------
    |
    | Here you may configure the cache stores for your application. 
    |
    | Available Drivers: "memory", "database", "file", "redis"
    |
    */
    'stores': {
        
        'memory': {
            'driver': 'memory',
        },

        'database': {
            'driver': 'database',
            'table': 'caches',
            'connection': null,
        },

        'file': {
            'driver': 'file',
            'path': storage_path('framework/cache/data'),
        },

        'session': {
            'stores': env('CACHE_DRIVER', 'file'),
            'path': storage_path('framework/sessions'),
        },

        'redis': {
            'driver': 'redis',
            'server': {
                'host': env('REDIS_HOST', 'localhost'),
                'port': env('REDIS_PORT', 13002),
                'password': env('REDIS_PASSWORD'),
                'user': env('REDIS_USERNAME'),
            }
        },

        'memcached': {
            'driver': 'memcached',
            'persistent_id': env('MEMCACHED_PERSISTENT_ID'),

            'options': {},
            'server': {

                'host': env('MEMCACHED_HOST', '127.0.0.1'),
                'port': env('MEMCACHED_PORT', 11211),
                'weight': 100,
                'user': env('MEMCACHED_USERNAME'),
                'password': env('MEMCACHED_PASSWORD'),

            },
        }
    },
    'prefix': env('CACHE_PREFIX', env('APP_NAME', 'ostro') + '_cache'),
}
