"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("@ostro/support/function");
const config = {
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
    'default': (0, function_1.env)('CACHE_DRIVER', 'file'),
    /*
    |--------------------------------------------------------------------------
    | Cache Enablement Flag
    |--------------------------------------------------------------------------
    |
    | Globally enables or disables caching throughout the application.
    | When set to false, caching logic will be bypassed entirely.
    |
    */
    'enabled': (0, function_1.env)('CACHE_ENABLE', true),
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
            'driver': 'memory', // Fast in-memory caching; non-persistent (lost on restart)
        },
        'database': {
            'driver': 'database', // Caches data in a database table
            'table': 'caches', // Table name where cache entries are stored
            'connection': null, // Database connection name; null uses default
        },
        'file': {
            'driver': 'file', // Stores cache items as files on disk
            'path': (0, function_1.storage_path)('framework/cache/data'), // Directory to store cache files
        },
        'session': {
            'stores': (0, function_1.env)('CACHE_DRIVER', 'file'), // Uses session storage for caching
            'path': (0, function_1.storage_path)('framework/sessions'), // Path where session files are saved
        },
        'redis': {
            'driver': 'redis', // Uses Redis key-value store for caching
            'server': {
                'host': (0, function_1.env)('REDIS_HOST', 'localhost'), // Redis server hostname/IP
                'port': (0, function_1.env)('REDIS_PORT', 13002), // Redis port number
                'password': (0, function_1.env)('REDIS_PASSWORD'), // Password if Redis is secured
                'user': (0, function_1.env)('REDIS_USERNAME'), // Optional Redis username
            },
        },
        'memcached': {
            'driver': 'memcached', // Uses Memcached server for caching
            'persistent_id': (0, function_1.env)('MEMCACHED_PERSISTENT_ID'), // Optional persistent connection ID
            'options': {}, // Extra Memcached client options (e.g., compression, timeout)
            'server': {
                'host': (0, function_1.env)('MEMCACHED_HOST', '127.0.0.1'), // Memcached server IP/hostname
                'port': (0, function_1.env)('MEMCACHED_PORT', 11211), // Memcached listening port
                'weight': 100, // Weight for load balancing
                'user': (0, function_1.env)('MEMCACHED_USERNAME'), // Optional username for auth
                'password': (0, function_1.env)('MEMCACHED_PASSWORD'), // Optional password for auth
            },
        },
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
    'prefix': (0, function_1.env)('CACHE_PREFIX', (0, function_1.env)('APP_NAME', 'ostro') + '_cache'),
};
exports.default = config;
