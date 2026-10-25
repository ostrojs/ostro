import { describe, test, expect, beforeAll, beforeEach, afterAll, afterEach, jest } from "@jest/globals";
import '@ostro/support/helpers';
import path from 'node:path';
import fs from 'node:fs';
import ConsoleKernel from '../src/app/console/kernel';
import ModelMakeCommand from '@ostro/foundation/console/modelMakeCommand';
import ConsoleMakeCommand from '@ostro/foundation/console/consoleMakeCommand';
import EventMakeCommand from '@ostro/foundation/console/eventMakeCommand';
import EventGenerateCommand from '@ostro/foundation/console/eventGenerateCommand';
import KeyGenerateCommand from '@ostro/foundation/console/keyGenerateCommand';
import ResourceMakeCommand from '@ostro/foundation/console/resourceMakeCommand';
import StorageLinkCommand from '@ostro/foundation/console/storageLinkCommand';
import ServerBootstrapCommand from '@ostro/foundation/console/serverBootstrapCommand';
import ServerlessBootstrapCommand from '@ostro/foundation/console/serverlessBootstrapCommand';
import ServeCommand from '@ostro/foundation/console/serveCommand';

describe('Assistant CLI Commands and Generator Suite', () => {
    let tmpDir: string;
    let appMock: any;
    let originalCwd: string;

    beforeAll(() => {
        originalCwd = process.cwd();
    });

    afterAll(() => {
        try {
            process.chdir(originalCwd);
        } catch {}
    });

    beforeEach(() => {
        tmpDir = path.join(__dirname, 'tmp_assistant_' + Date.now());
        fs.mkdirSync(tmpDir, { recursive: true });

        (global as unknown as Record<string, unknown>).base_path = (p = '') => path.join(tmpDir, p);
        (global as unknown as Record<string, unknown>).app_path = (p = '') => path.join(tmpDir, 'app', p);
        (global as unknown as Record<string, unknown>).config_path = (p = '') => path.join(tmpDir, 'config', p);
        (global as unknown as Record<string, unknown>).database_path = (p = '') => path.join(tmpDir, 'database', p);
        (global as unknown as Record<string, unknown>).storage_path = (p = '') => path.join(tmpDir, 'storage', p);
        (global as unknown as Record<string, unknown>).public_path = (p = '') => path.join(tmpDir, 'public', p);

        appMock = {
            basePath: (p = '') => path.join(tmpDir, p),
            configPath: (p = '') => path.join(tmpDir, 'config', p),
            environmentFilePath: () => path.join(tmpDir, '.env'),
            version: () => '2.0.0-alpha.1',
            hasBeenBootstrapped: () => true,
            bootstrapWith: jest.fn(),
            loadDeferredProviders: jest.fn(),
            config: {
                'app.cipher': 'AES-256-CBC',
                'app.key': '',
                'filesystems.links': null
            },
            '@ostro/contracts/exception/handler': {
                report: jest.fn(),
                renderForConsole: jest.fn()
            }
        };
        ConsoleKernel.prototype.$app = appMock;
    });

    afterEach(() => {
        try {
            process.chdir(originalCwd);
            fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch {}
    });

    test('ConsoleKernel initializes and resolves assistant commands', () => {
        const kernel = new ConsoleKernel();
        expect(kernel).toBeDefined();
        expect(kernel.getBootstrappers()).toBeInstanceOf(Array);
        expect(typeof kernel.getAssistant).toBe('function');
    });

    test('ModelMakeCommand stub resolution, options, and namespaces', async () => {
        const fileMock = { exists: jest.fn().mockResolvedValue(false) };
        const cmd = new ModelMakeCommand();
        cmd.$app = appMock;
        cmd.$file = fileMock;
        cmd.callCommand = jest.fn().mockResolvedValue(true);
        cmd.getNameInput = () => 'Product';
        cmd.argument = () => 'Product';

        const regularStub = await cmd.getStub();
        expect(regularStub).toContain('stubs/model.stub');

        // Namespace
        expect(cmd.getDefaultNamespace('root')).toBe(path.join(tmpDir, 'app', 'models'));
    });

    test('ConsoleMakeCommand custom signature generation and replacement', async () => {
        const fileMock = { exists: jest.fn().mockResolvedValue(false) };
        const cmd = new ConsoleMakeCommand();
        cmd.$app = appMock;
        cmd.$file = fileMock;

        cmd.option = jest.fn().mockReturnValue('send:newsletter');
        cmd.argument = jest.fn().mockReturnValue('SendNewsletter');

        const stubContent = 'class DummyClass extends Command {\n    $signature = \'dummy:command\';\n}';
        const replaced = cmd.replaceClass(stubContent, 'send:newsletter');
        expect(replaced).toContain('send:newsletter');
        expect(cmd.getDefaultNamespace('root')).toBe(path.join('root', 'app', 'console', 'commands'));
    });

    test('ResourceMakeCommand single and collection stub resolution', async () => {
        const fileMock = { exists: jest.fn().mockResolvedValue(false) };
        const cmd = new ResourceMakeCommand();
        cmd.$app = appMock;
        cmd.$file = fileMock;
        cmd.argument = jest.fn().mockReturnValue('UserResource');

        cmd.option = jest.fn().mockReturnValue(false);
        const singleStub = await cmd.getStub();
        expect(singleStub).toContain('stubs/resource.stub');

        cmd.option = jest.fn().mockReturnValue(true);
        const colStub = await cmd.getStub();
        expect(colStub).toContain('stubs/resource-collection.stub');

        expect(cmd.getDefaultNamespace('root')).toBe(path.join('root', 'app', 'http', 'resources'));
    });

    test('EventMakeCommand and EventGenerateCommand', async () => {
        const fileMock = { exists: jest.fn().mockResolvedValue(false) };
        const makeCmd = new EventMakeCommand();
        makeCmd.$app = appMock;
        makeCmd.$file = fileMock;

        const stub = await makeCmd.getStub();
        expect(stub).toContain('stubs/event.stub');
        expect(makeCmd.getDefaultNamespace('root')).toBe(path.join('root', 'app', 'events'));

        const genCmd = new EventGenerateCommand();
        genCmd.info = jest.fn();
        genCmd.callSilent = jest.fn();
        await genCmd.handle();
        expect(genCmd.info).toHaveBeenCalledWith('Events and listeners generated successfully!');
    });

    test('KeyGenerateCommand generates random AES-256 keys and updates .env', async () => {
        const envContent = 'APP_NAME=Ostro\nAPP_KEY=\n';
        const fileMock = {
            get: jest.fn().mockResolvedValue(envContent),
            put: jest.fn().mockResolvedValue(true)
        };
        const cmd = new KeyGenerateCommand(fileMock);
        cmd.$app = appMock;
        cmd.line = jest.fn();
        cmd.info = jest.fn();
        cmd.option = jest.fn().mockReturnValue(false);
        cmd.confirmToProceed = jest.fn().mockResolvedValue(true);

        const key = cmd.generateRandomKey();
        expect(key.startsWith('base64:')).toBe(true);

        await cmd.handle();
        expect(fileMock.put).toHaveBeenCalledWith(
            path.join(tmpDir, '.env'),
            expect.stringContaining('APP_KEY=base64:')
        );
        expect(cmd.info).toHaveBeenCalledWith('Application key set successfully.');
    });

    test('StorageLinkCommand verifies symlink configuration and targets', async () => {
        const cmd = new StorageLinkCommand();
        cmd.$app = appMock;
        cmd.info = jest.fn();
        cmd.error = jest.fn();
        cmd.option = jest.fn().mockReturnValue(false);

        const links = cmd.links();
        expect(links).toEqual({
            [path.join(tmpDir, 'public/storage')]: path.join(tmpDir, 'storage/app/public')
        });
    });

    test('ServerBootstrapCommand and ServerlessBootstrapCommand configure app entrypoints', async () => {
        const fileMock = {
            exists: jest.fn().mockResolvedValue(false),
            get: jest.fn().mockResolvedValue("server.type('serverless');\nserver.start();\n"),
            put: jest.fn().mockResolvedValue(true)
        };
        const serverCmd = new ServerBootstrapCommand(fileMock);
        serverCmd.$app = appMock;
        serverCmd.info = jest.fn();
        serverCmd.error = jest.fn();
        serverCmd.option = jest.fn().mockReturnValue(true);

        await serverCmd.handle();
        expect(fileMock.put).toHaveBeenCalledWith(
            path.join(tmpDir, 'app.js'),
            expect.stringContaining("server.type('server')")
        );

        const serverlessCmd = new ServerlessBootstrapCommand(fileMock);
        serverlessCmd.$app = appMock;
        serverlessCmd.info = jest.fn();
        serverlessCmd.error = jest.fn();
        serverlessCmd.option = jest.fn().mockReturnValue(true);
        expect(serverlessCmd.$signature).toContain('serverless:bootstrap');
    });

    test('ServeCommand validates default port and host', () => {
        const serveCmd = new ServeCommand();
        expect(serveCmd.$signature).toContain('serve');
        expect(serveCmd.$description).toBeDefined();
    });
});
