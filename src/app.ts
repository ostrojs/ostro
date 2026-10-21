import app from './bootstrap/app';
import requestHandler from '@ostro/foundation/http/request';
import responseHandler from '@ostro/foundation/http/response';
import type { IHttpKernel } from '@ostro/contracts/http/kernel';
import type { IServer } from '@ostro/contracts/server/server';

const kernel: IHttpKernel = app.make('@ostro/contracts/http/kernel');

const server: IServer = app.make('@ostro/server', (app as unknown as { config: unknown }).config);

server.request(requestHandler);

server.response(responseHandler);

server.register(kernel.handle({} as any));

server.start();

export default server;
