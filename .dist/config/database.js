"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("@ostro/support/function");
const config = {
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
    default: (0, function_1.env)("DB_CONNECTION", "sqlite"),
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
            url: (0, function_1.env)("DATABASE_URL"),
            database: (0, function_1.env)("DB_DATABASE", (0, function_1.database_path)("database.sqlite")),
            foreign_key_constraints: (0, function_1.env)("DB_FOREIGN_KEYS", true),
        },
        mysql: {
            driver: "mysql",
            host: (0, function_1.env)("DB_HOST", "127.0.0.1"),
            port: (0, function_1.env)("DB_PORT", 3306),
            database: (0, function_1.env)("DB_DATABASE", "forge"),
            username: (0, function_1.env)("DB_USERNAME", "forge"),
            password: (0, function_1.env)("DB_PASSWORD", ""),
        },
        pgsql: {
            driver: "pgsql",
            url: (0, function_1.env)("DATABASE_URL"),
            host: (0, function_1.env)("DB_HOST", "127.0.0.1"),
            port: (0, function_1.env)("DB_PORT", 5432),
            database: (0, function_1.env)("DB_DATABASE", "forge"),
            username: (0, function_1.env)("DB_USERNAME", "forge"),
            password: (0, function_1.env)("DB_PASSWORD", ""),
            prefix: "",
            schema: "public",
        },
        sqlsrv: {
            driver: "sqlsrv",
            host: (0, function_1.env)("DB_HOST", "127.0.0.1"),
            port: (0, function_1.env)("DB_PORT", 1433),
            database: (0, function_1.env)("DB_DATABASE", "forge"),
            username: (0, function_1.env)("DB_USERNAME", "forge"),
            password: (0, function_1.env)("DB_PASSWORD", ""),
            charset: "utf8",
            prefix: "",
            encrypt: (0, function_1.env)('DB_ENCRYPT', false),
        },
        oracle: {
            driver: "oracle",
            host: (0, function_1.env)("DB_HOST", "127.0.0.1"),
            port: (0, function_1.env)("DB_PORT", 1521),
            database: (0, function_1.env)("DB_DATABASE", "forge"),
            username: (0, function_1.env)("DB_USERNAME", "forge"),
            password: (0, function_1.env)("DB_PASSWORD", ""),
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
    migration_path: (0, function_1.database_path)("migrations"),
    /*
    |--------------------------------------------------------------------------
    | Seeder Path
    |--------------------------------------------------------------------------
    |
    | The directory path where your database seed files are located.
    | Seeders are used to populate your database with test or initial data.
    |
    */
    seeder_path: (0, function_1.database_path)("seeders"),
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
exports.default = config;
