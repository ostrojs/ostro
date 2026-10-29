"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./bootstrap/app"));
const request_1 = __importDefault(require("@ostro/foundation/http/request"));
const response_1 = __importDefault(require("@ostro/foundation/http/response"));
const kernel = app_1.default.make('@ostro/contracts/http/kernel');
const server = app_1.default.make('@ostro/server', app_1.default.config);
server.request(request_1.default);
server.response(response_1.default);
server.register(kernel.handle({}));
server.start();
exports.default = server;
