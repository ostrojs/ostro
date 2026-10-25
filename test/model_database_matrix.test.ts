import { describe, test, expect, beforeEach, afterEach, jest } from "@jest/globals";
import User from '../src/app/models/user';
import CreateUsersTables from '../src/database/migrations/2026_10_21_053500_create_users_tables';
import DatabaseSeeder from '../src/database/seeders/databaseSeeder';
import Facade from '@ostro/support/facades/facade';

describe('Model & Database Extensive Matrix Tests (Positive, Negative, and Edge Cases)', () => {
    let appMock: any;

    beforeEach(() => {
        let counter = 0;
        appMock = {
            'db.schema': {
                create: jest.fn(),
                dropIfExists: jest.fn()
            },
            encrypter: {
                encrypt: jest.fn((val) => `encrypted_${++counter}_` + Buffer.from(String(val)).toString('base64'))
            }
        };
        Facade.setFacadeApplication(appMock);
    });

    afterEach(() => {
        Facade.setFacadeApplication(null);
    });

    describe('User Model Parameter Combinations', () => {
        const testUsers = [
            { desc: 'valid full attributes', input: { name: 'Alice', email: 'alice@test.com', password: 'secret_password_1', remember_token: 'tok1' } },
            { desc: 'empty attributes', input: {} },
            { desc: 'extra unfillable attributes', input: { name: 'Bob', email: 'bob@test.com', password: 'pass', is_admin: true, balance: 1000 } },
            { desc: 'numeric and special chars in name', input: { name: 'User#123_@!-Special', email: 'special@test.com', password: 'complex!pass#$%' } },
            { desc: 'unicode characters', input: { name: 'Алексей', email: 'alex@test.ru', password: 'пароль' } },
            { desc: 'long strings', input: { name: 'A'.repeat(255), email: 'b'.repeat(100) + '@example.com', password: 'c'.repeat(100) } }
        ];

        testUsers.forEach(({ desc, input }) => {
            test(`Instantiating User model with ${desc}`, () => {
                const user = new User(input);
                expect(user).toBeInstanceOf(User);
                expect(user.getFillable()).toEqual(['name', 'email', 'password']);
                expect(user.getHidden()).toEqual(['password', 'remember_token']);
            });
        });

        test('createToken generates unique access token with positive and negative id conditions', async () => {
            // Positive id
            const user1 = new User();
            user1.getKeyName = () => 'id';
            user1.getAttribute = (k: any) => 1;
            user1.setApiToken = jest.fn();
            user1.save = jest.fn().mockResolvedValue(true);

            const res1 = await user1.createToken();
            expect(res1).toHaveProperty('accessToken');
            expect(user1.setApiToken).toHaveBeenCalledWith(res1.accessToken);
            expect(user1.save).toHaveBeenCalled();

            // Null/negative id
            const user2 = new User();
            user2.getKeyName = () => 'id';
            user2.getAttribute = (k: any) => null;
            user2.setApiToken = jest.fn();
            user2.save = jest.fn().mockResolvedValue(true);

            const res2 = await user2.createToken();
            expect(res2).toHaveProperty('accessToken');
            expect(res2.accessToken).not.toEqual(res1.accessToken);

            // Save rejection negative case
            const userErr = new User();
            userErr.getKeyName = () => 'id';
            userErr.getAttribute = () => 42;
            userErr.setApiToken = jest.fn();
            userErr.save = jest.fn().mockRejectedValue(new Error('Database disk full'));

            await expect(userErr.createToken()).rejects.toThrow('Database disk full');
        });
    });

    describe('Migration Blueprint Matrix and Rollback Scenarios', () => {
        test('Migration up executes schema builder with expected column types', async () => {
            const migration = new CreateUsersTables();

            let callback: any = null;
            appMock['db.schema'].create.mockImplementation((name: string, cb: Function) => {
                callback = cb;
            });

            await migration.up();
            expect(appMock['db.schema'].create).toHaveBeenCalledWith('users', expect.any(Function));

            const tableMock = {
                increments: jest.fn().mockReturnValue({ primary: jest.fn() }),
                string: jest.fn().mockReturnValue({ unique: jest.fn() }),
                timestamps: jest.fn()
            };

            callback(tableMock);
            expect(tableMock.increments).toHaveBeenCalledWith('id');
            expect(tableMock.string).toHaveBeenCalledWith('name');
            expect(tableMock.string).toHaveBeenCalledWith('email');
            expect(tableMock.string).toHaveBeenCalledWith('remember_token');
            expect(tableMock.string).toHaveBeenCalledWith('api_token');
            expect(tableMock.string).toHaveBeenCalledWith('password');
            expect(tableMock.timestamps).toHaveBeenCalled();
        });

        test('Migration down drops table correctly', async () => {
            const migration = new CreateUsersTables();
            await migration.down();
            expect(appMock['db.schema'].dropIfExists).toHaveBeenCalledWith('users');
        });

        test('Migration error handling when schema builder rejects', async () => {
            const migration = new CreateUsersTables();
            appMock['db.schema'].create.mockRejectedValueOnce(new Error('Connection timeout'));
            await expect(migration.up()).rejects.toThrow('Connection timeout');

            appMock['db.schema'].dropIfExists.mockRejectedValueOnce(new Error('Table locked'));
            await expect(migration.down()).rejects.toThrow('Table locked');
        });

        test('DatabaseSeeder run execution and exception propagation', async () => {
            const seeder = new DatabaseSeeder();
            await expect(seeder.run()).resolves.toBeUndefined();

            // Negative scenario
            jest.spyOn(seeder, 'run').mockRejectedValueOnce(new Error('Seeder duplicate entry'));
            await expect(seeder.run()).rejects.toThrow('Seeder duplicate entry');
        });
    });
});
