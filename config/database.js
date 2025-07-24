module.exports = {
  /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course,
    | you may use many connections at once using the OstroJS database system.
    |
    */
  default: env("DB_CONNECTION", "sqlite"), // Default database connection used by the application

  /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Examples for different platforms supported by OstroJS are included
    | to help make configuration and development easier.
    |
    | All database operations in OstroJS are handled using Node.js drivers,
    | so make sure you have the necessary Node packages installed for the
    | specific database you're using before development begins.
    |
    */
  connections: {

    sqlite: {
      driver: "sqlite", // SQLite is a lightweight file-based database
      url: env("DATABASE_URL"), // Optional override using DATABASE_URL
      database: env("DB_DATABASE", database_path("database.sqlite")), // Path to SQLite DB file
      foreign_key_constraints: env("DB_FOREIGN_KEYS", true) // Enable or disable FK constraints
    },

    mysql: {
      driver: "mysql", // MySQL database connection settings
      host: env("DB_HOST", "127.0.0.1"), // MySQL host address
      port: env("DB_PORT", 3306), // MySQL server port
      database: env("DB_DATABASE", "forge"), // Database name
      username: env("DB_USERNAME", "forge"), // Database username
      password: env("DB_PASSWORD", ""), // Database password
    },

    pgsql: {
      driver: "pgsql", // PostgreSQL connection driver
      url: env("DATABASE_URL"), // Optional URL-based connection string
      host: env("DB_HOST", "127.0.0.1"), // PostgreSQL host
      port: env("DB_PORT", 5432), // PostgreSQL port
      database: env("DB_DATABASE", "forge"), // Database name
      username: env("DB_USERNAME", "forge"), // PostgreSQL username
      password: env("DB_PASSWORD", ""), // PostgreSQL password
      prefix: "", // Optional table prefix
      schema: "public" // PostgreSQL schema to use
    },

    sqlsrv: {
      driver: "sqlsrv", // Microsoft SQL Server connection driver
      host: env("DB_HOST", "127.0.0.1"), // SQL Server host
      port: env("DB_PORT", 1433), // SQL Server port
      database: env("DB_DATABASE", "forge"), // Database name
      username: env("DB_USERNAME", "forge"), // SQL Server username
      password: env("DB_PASSWORD", ""), // SQL Server password
      charset: "utf8", // Character encoding
      prefix: "", // Optional table prefix
      encrypt: env('DB_ENCRYPT', false), // Whether to use encryption for the connection
    },

    oracle: {
      driver: "oracle", // Oracle DB connection driver
      host: env("DB_HOST", "127.0.0.1"), // Oracle host address
      port: env("DB_PORT", 1521), // Oracle port number
      database: env("DB_DATABASE", "forge"), // Database SID or service name
      username: env("DB_USERNAME", "forge"), // Oracle DB username
      password: env("DB_PASSWORD", ""), // Oracle DB password
      charset: "utf8", // Character encoding
      prefix: "", // Optional table prefix
    },
  },

  /*
    |--------------------------------------------------------------------------
    | Migration Files Path
    |--------------------------------------------------------------------------
    |
    | This option defines where the framework should look for your database
    | migration files. You can customize this path to organize your project
    | as needed. These files are used to define the schema of your tables.
    |
    */
  migration_path: database_path("migrations"),

  /*
    |--------------------------------------------------------------------------
    | Seeder Files Path
    |--------------------------------------------------------------------------
    |
    | This option defines the location where your database seeder files reside.
    | Seeders are used to populate your database with sample or default data.
    | You can group seeders here to keep things structured and maintainable.
    |
    */
  seeder_path: database_path("seeders"),

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
  migrations: "migrations",
};
