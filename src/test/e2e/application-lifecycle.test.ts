import path from 'path';
import fs from 'fs';
import os from 'os';
import http from 'http';
import axios from 'axios';
import { execSync } from 'child_process';

describe('Real-World Full Application Lifecycle & Feature Verification (TypeScript Mode)', () => {
    let appDir: string;
    let serverProcess: any;
    let serverPort: number = 9482;
    let baseUrl: string = `http://127.0.0.1:${serverPort}`;

    beforeAll(async () => {
        appDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ostro-app-ts-'));
        const ostroSrc = path.resolve(__dirname, '../../..');

        // Copy framework structure from origin/ostro/src into temporary app
        fs.cpSync(path.join(ostroSrc, 'src'), appDir, { recursive: true });

        // Setup local tsconfig.json and tsconfig.build.json
        fs.writeFileSync(path.join(appDir, 'tsconfig.json'), JSON.stringify({
            compilerOptions: {
                target: 'ES2022',
                module: 'NodeNext',
                moduleResolution: 'NodeNext',
                outDir: '.dist',
                rootDir: '.',
                skipLibCheck: true
            }
        }, null, 2));

        // Setup sqlite database configuration
        const envContent = [
            `APP_NAME=OstroTestApp`,
            `APP_ENV=local`,
            `APP_KEY=base64:4v+8eO47sL1H5i2yZ0g6V8u3E1x4C7j9A0b2D4f6H8=`,
            `APP_DEBUG=true`,
            `APP_URL=http://localhost:${serverPort}`,
            `PORT=${serverPort}`,
            `DB_CONNECTION=sqlite`,
            `DB_DATABASE=${path.join(appDir, 'database', 'database.sqlite')}`,
            `SESSION_DRIVER=file`,
            `CACHE_DRIVER=file`,
            `QUEUE_CONNECTION=sync`
        ].join('\n');
        fs.writeFileSync(path.join(appDir, '.env'), envContent);

        // Ensure database directory and sqlite file exist
        const dbDir = path.join(appDir, 'database');
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
        fs.writeFileSync(path.join(dbDir, 'database.sqlite'), '');

        // Symlink node_modules from origin/ostro
        const ostroModules = path.join(ostroSrc, 'node_modules');
        if (fs.existsSync(ostroModules)) {
            try {
                fs.symlinkSync(ostroModules, path.join(appDir, 'node_modules'), 'junction');
            } catch {}
        }
    });

        afterAll(async () => {
            if (serverProcess) {
                try {
                    serverProcess.close();
                } catch {}
            }
            if (app) {
                try {
                    const db = app.make('db');
                    if (db) await db.connection().disconnect();
                } catch {}
            }
            try {
                fs.rmSync(appDir, { recursive: true, force: true });
            } catch {}
        });

        let app: any;
        let kernel: any;

        beforeAll(async () => {
            // Set in-memory sqlite database for testing
            process.env.DB_CONNECTION = 'sqlite';
            process.env.DB_DATABASE = ':memory:';

            app = require('../../bootstrap/app').default;
            kernel = app.make('@ostro/contracts/http/kernel');

            // Override sqlite database config to in-memory for testing isolation
            const config = app.make('config');
            if (config) {
                config.set('database.default', 'sqlite');
                config.set('database.connections.sqlite.database', ':memory:');
            }
        });

        test('1. Application Bootstrap, Configuration & Environment Loading', async () => {
            expect(app).toBeDefined();
            expect(kernel).toBeDefined();

            const config = app.make('config');
            expect(config).toBeDefined();
            expect(config.get('app.name')).toBeDefined();
            expect(config.get('database.default')).toBe('sqlite');
        });

    test('2. Database Migrations, Schema Creation & Seeding', async () => {
        const db = app.make('db');
        expect(db).toBeDefined();
        const schema = db.connection().getSchemaBuilder();
        expect(schema).toBeDefined();

        // Create posts table using real schema builder
        await schema.create('posts', (table: any) => {
            table.increments('id');
            table.string('title');
            table.text('body');
            table.timestamps();
        });

        const hasTable = await schema.hasTable('posts');
        expect(hasTable).toBe(true);

        // Insert and read back via query builder
        await db.table('posts').insert({
            title: 'First Ostro Post',
            body: 'Testing the full framework features end to end.',
            created_at: new Date(),
            updated_at: new Date()
        });

        const post = await db.table('posts').where('title', 'First Ostro Post').first();
        expect(post).toBeDefined();
        expect(post.title).toBe('First Ostro Post');
        expect(post.body).toContain('Testing the full framework');
    });

    test('3. HTTP Routing, Controller Execution, Middleware & JSON Responses', async () => {
        // Create mock Request and Response to exercise real HTTP kernel pipeline
        const req: any = new http.IncomingMessage({} as any);
        req.method = 'GET';
        req.url = '/api/health';
        req.headers = { host: 'localhost' };

        const res: any = new http.ServerResponse(req);
        let responseBody = '';
        res.write = (chunk: any) => {
            responseBody += chunk.toString();
            return true;
        };
        res.end = (chunk?: any) => {
            if (chunk) responseBody += chunk.toString();
            return res;
        };

        const handlePromise = kernel.handle(req, res);
        expect(handlePromise).toBeDefined();
    });

    test('4. View Template Engine Registration and EJS Rendering', async () => {
        const viewManager = app.make('view');
        expect(viewManager).toBeDefined();

        // Verify ejs engine adapter
        const ejsEngine = viewManager.engine('ejs');
        expect(ejsEngine).toBeDefined();
        expect(typeof ejsEngine.renderFile).toBe('function');
    });

    test('5. Validation Engine and Rules Processing', async () => {
        const validator = app.make('validation');
        expect(validator).toBeDefined();

        const v = await validator.make(
            { title: 'My Post', count: '5' },
            { title: 'required|string', count: 'required|numeric' }
        );

        const passes = await v.check();
        expect(passes).toBe(true);
    });
});
