const app = require('./bootstrap/app')

let kernel = app.make('@ostro/contracts/http/kernel');

let server = app.make('@ostro/server',app.config);

server.request(require('@ostro/foundation/http/request'))

server.response(require('@ostro/foundation/http/response'))

server.register(kernel.handle())

server.start()
