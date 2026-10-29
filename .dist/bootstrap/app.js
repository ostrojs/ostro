"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@ostro/support/helpers");
const application_1 = __importDefault(require("@ostro/foundation/application"));
const kernel_1 = __importDefault(require("~/app/http/kernel"));
const kernel_2 = __importDefault(require("~/app/console/kernel"));
const handlerManager_1 = __importDefault(require("@ostro/foundation/exception/handlerManager"));
const handler_1 = __importDefault(require("~/app/exceptions/handler"));
const app = new application_1.default(process.cwd());
app.singleton('@ostro/contracts/http/kernel', kernel_1.default);
app.singleton('@ostro/contracts/console/kernel', kernel_2.default);
app.singleton('@ostro/contracts/exception/handler', handlerManager_1.default, handler_1.default);
exports.default = app;
