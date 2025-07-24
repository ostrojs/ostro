const Schema = require('@ostro/support/facades/schema');
const Migration = require('@ostro/database/migration');

class CreateUsersTables extends Migration {

    
    async up()
    {
        await Schema.create('users', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.string('email').unique();
            table.string('remember_token').unique()
            table.string('api_token').unique()
            table.string('password');
            table.timestamps();
        });
    }
    
    
    async down()
    {
        await Schema.dropIfExists('users');
    }
}

module.exports = CreateUsersTables
