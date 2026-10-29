"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("@ostro/support/facades/schema"));
const migration_1 = __importDefault(require("@ostro/database/migration"));
/**
 * Class CreateUsersTables.
 */
class CreateUsersTables extends migration_1.default {
    /**
     * Run the migrations.
     *
     * @returns {Promise<void>}
     */
    async up() {
        await schema_1.default.create('users', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.string('email').unique();
            table.string('remember_token').unique();
            table.string('api_token').unique();
            table.string('password');
            table.timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @returns {Promise<void>}
     */
    async down() {
        await schema_1.default.dropIfExists('users');
    }
}
exports.default = CreateUsersTables;
