import Schema from '@ostro/support/facades/schema';
import Migration from '@ostro/database/migration';
import type { Blueprint } from '@ostro/contracts/database/blueprint';
import type { IMigration } from '@ostro/contracts/database/migration';

/**
 * Class CreateUsersTables.
 */
class CreateUsersTables extends Migration implements IMigration {

    /**
     * Run the migrations.
     *
     * @returns {Promise<void>}
     */
    public override async up(): Promise<void> {
        await Schema.create('users', function (table: Blueprint) {
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
    public override async down(): Promise<void> {
        await Schema.dropIfExists('users');
    }
}

export default CreateUsersTables;
