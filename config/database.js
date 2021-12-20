module.exports = {  
    
    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */
   
    'default': env('DB_CONNECTION', 'sqlite'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by OstroJS is shown below to make development simple.
    |
    |
    | All database work in OstroJS is done through the KNEX connection
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */
   
    'connections': {
        'sqlite': {
            'driver': 'sqlite',
            'url': env('DATABASE_URL'),
            'database': env('DB_DATABASE', database_path('database.sqlite')),
            'foreign_key_constraints': env('DB_FOREIGN_KEYS', true),
        },
        'mysql': {
            'driver': 'mysql',
            'host': env('DB_HOST', '127.0.0.1'),
            'port': env('DB_PORT', '3306'),
            'database': env('DB_DATABASE', 'forge'),
            'user': env('DB_USERNAME', 'forge'),
            'password': env('DB_PASSWORD', '')
        },
        'pgsql': {
            'driver': 'pgsql',
            'url': env('DATABASE_URL'),
            'host': env('DB_HOST', '127.0.0.1'),
            'port': env('DB_PORT', '5432'),
            'database': env('DB_DATABASE', 'forge'),
            'username': env('DB_USERNAME', 'forge'),
            'password': env('DB_PASSWORD', ''),
            'charset': 'utf8',
            'prefix': '',
            'prefix_indexes': true,
            'schema': 'public',
            'sslmode': 'prefer',
        },
        'sqlsrv': {
            'driver': 'sqlsrv',
            'url': env('DATABASE_URL'),
            'host': env('DB_HOST', 'localhost'),
            'port': env('DB_PORT', '1433'),
            'database': env('DB_DATABASE', 'forge'),
            'username': env('DB_USERNAME', 'forge'),
            'password': env('DB_PASSWORD', ''),
            'charset': 'utf8',
            'prefix': '',
            'prefix_indexes': true,
        },
    },

    'migration_path': database_path('migrations'),
    
    'seeder_path': database_path('seeders'),

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */
    'migrations': 'migrations',

}