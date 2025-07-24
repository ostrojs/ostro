module.exports = {  
    
    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Specify which database connection below to use as the default connection
    | for all database operations in OstroJS. You may define multiple 
    | connections and use them as needed.
    |
    */
   
    default: env('DB_CONNECTION', 'sqlite'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Define the database connection configurations for your application.
    | Examples include sqlite, mysql, pgsql, and sqlsrv. OstroJS uses node
    | database drivers like 'mysql2', 'pg', or 'mssql'.
    |
    | Ensure the required Node.js drivers are installed in your project.
    |
    */
   
    connections: {
        sqlite: {
            driver: 'sqlite',
            url: env('DATABASE_URL'),
            database: env('DB_DATABASE', path.resolve('database.sqlite')),
            foreignKeyConstraints: env('DB_FOREIGN_KEYS', true),
        },
        mysql: {
            driver: 'mysql', // Use 'mysql2' driver package in Node.js environment
            host: env('DB_HOST', '127.0.0.1'),
            port: Number(env('DB_PORT', 3306)),
            database: env('DB_DATABASE', 'forge'),
            user: env('DB_USERNAME', 'forge'),
            password: env('DB_PASSWORD', ''),
        },
        pgsql: {
            driver: 'pg', // PostgreSQL driver package for Node.js
            url: env('DATABASE_URL'),
            host: env('DB_HOST', '127.0.0.1'),
            port: Number(env('DB_PORT', 5432)),
            database: env('DB_DATABASE', 'forge'),
            user: env('DB_USERNAME', 'forge'),
            password: env('DB_PASSWORD', ''),
            charset: 'utf8',
            schema: 'public',
            ssl: { rejectUnauthorized: false }, // SSL config for pg driver
        },
        sqlsrv: {
            driver: 'mssql', // Microsoft SQL Server Node.js driver
            url: env('DATABASE_URL'),
            host: env('DB_HOST', 'localhost'),
            port: Number(env('DB_PORT', 1433)),
            database: env('DB_DATABASE', 'forge'),
            user: env('DB_USERNAME', 'forge'),
            password: env('DB_PASSWORD', ''),
            charset: 'utf8',
        },
    },

    /*
    |--------------------------------------------------------------------------
    | Migration & Seeder Paths
    |--------------------------------------------------------------------------
    |
    | Define the paths for migration and seeder scripts relative to the 
    | project root. OstroJS migration system will use these locations.
    |
    */
    migrationPath: path.resolve('database/migrations'),
    seederPath: path.resolve('database/seeders'),

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all migrations that have been run in the
    | database so that migrations aren't run twice. OstroJS will use this.
    |
    */
    migrationsTable: 'migrations',

};
