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
      database: env('DB_DATABASE', database_path('database.sqlite')),
      foreign_key_constraints: env('DB_FOREIGN_KEYS', true),
    },
    mysql: {
      driver: 'mysql',
      host: env('DB_HOST', '127.0.0.1'),
      port: env('DB_PORT', 3306),
      database: env('DB_DATABASE', 'forge'),
      username: env('DB_USERNAME', 'forge'),
      password: env('DB_PASSWORD', ''),
    },
    pgsql: {
      driver: 'pgsql',
      url: env('DATABASE_URL'),
      host: env('DB_HOST', '127.0.0.1'),
      port: env('DB_PORT', 5432),
      database: env('DB_DATABASE', 'forge'),
      username: env('DB_USERNAME', 'forge'),
      password: env('DB_PASSWORD', ''),
      prefix: '',
      schema: 'public',
    },
    sqlsrv: {
      driver: 'sqlsrv',
      host: env('DB_HOST', '127.0.0.1'),
      port: env('DB_PORT', 1433),
      database: env('DB_DATABASE', 'forge'),
      username: env('DB_USERNAME', 'forge'),
      password: env('DB_PASSWORD', ''),
      charset: 'utf8',
      prefix: '',
      encrypt: env('DB_ENCRYPT', false),
    },
    oracle: {
      driver: 'oracle',
      host: env('DB_HOST', '127.0.0.1'),
      port: env('DB_PORT', 1521),
      database: env('DB_DATABASE', 'forge'),
      username: env('DB_USERNAME', 'forge'),
      password: env('DB_PASSWORD', ''),
      charset: 'utf8',
      prefix: '',
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
  migration_path: path.resolve('database/migrations'),
  seeder_path: path.resolve('database/seeders'),

  /*
  |--------------------------------------------------------------------------
  | Migration Repository Table
  |--------------------------------------------------------------------------
  |
  | This table keeps track of all migrations that have been run in the
  | database so that migrations aren't run twice. OstroJS will use this.
  |
  */
  migrations: 'migrations',

};
