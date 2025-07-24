module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Database Connection Name
  |--------------------------------------------------------------------------
  |
  | Specifies which database connection from the 'connections' object should
  | be used by default for all database queries and operations, unless
  | explicitly overridden elsewhere.
  |
  */
  default: env("DB_CONNECTION", "sqlite"),

  /*
  |--------------------------------------------------------------------------
  | Database Connections
  |--------------------------------------------------------------------------
  |
  | Defines the configuration for each database connection your application
  | supports. Each connection includes driver details and connection options.
  | You can configure as many connections as needed here.
  |
  */
  connections: {
    sqlite: {
      driver: "sqlite",
      url: env("DATABASE_URL"),
      database: env("DB_DATABASE", database_path("database.sqlite")),
      foreign_key_constraints: env("DB_FOREIGN_KEYS", true),
    },
    mysql: {
      driver: "mysql",
      host: env("DB_HOST", "127.0.0.1"),
      port: env("DB_PORT", 3306),
      database: env("DB_DATABASE", "forge"),
      username: env("DB_USERNAME", "forge"),
      password: env("DB_PASSWORD", ""),
    },
    pgsql: {
      driver: "pgsql",
      url: env("DATABASE_URL"),
      host: env("DB_HOST", "127.0.0.1"),
      port: env("DB_PORT", 5432),
      database: env("DB_DATABASE", "forge"),
      username: env("DB_USERNAME", "forge"),
      password: env("DB_PASSWORD", ""),
      prefix: "",
      schema: "public",
    },
    sqlsrv: {
      driver: "sqlsrv",
      host: env("DB_HOST", "127.0.0.1"),
      port: env("DB_PORT", 1433),
      database: env("DB_DATABASE", "forge"),
      username: env("DB_USERNAME", "forge"),
      password: env("DB_PASSWORD", ""),
      charset: "utf8",
      prefix: "",
      encrypt: env('DB_ENCRYPT', false),
    },
    oracle: {
      driver: "oracle",
      host: env("DB_HOST", "127.0.0.1"),
      port: env("DB_PORT", 1521),
      database: env("DB_DATABASE", "forge"),
      username: env("DB_USERNAME", "forge"),
      password: env("DB_PASSWORD", ""),
      charset: "utf8",
      prefix: "",
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Migration Path
  |--------------------------------------------------------------------------
  |
  | The filesystem path where your database migration files are stored.
  | Migrations help version control your database schema changes.
  |
  */
  migration_path: database_path("migrations"),

  /*
  |--------------------------------------------------------------------------
  | Seeder Path
  |--------------------------------------------------------------------------
  |
  | The directory path where your database seed files are located.
  | Seeders are used to populate your database with test or initial data.
  |
  */
  seeder_path: database_path("seeders"),

  /*
  |--------------------------------------------------------------------------
  | Migration Repository Table
  |--------------------------------------------------------------------------
  |
  | The name of the database table that keeps track of which migrations
  | have already been executed. This allows the system to know what
  | migrations are pending and avoid re-running migrations.
  |
  */
  migrations: "migrations",
};