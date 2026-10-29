"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("@ostro/router/controller"));
const validatesRequests_1 = __importDefault(require("@ostro/foundation/validation/validatesRequests"));
const function_1 = require("@ostro/support/function");
/**
 * Class Controller.
 */
class Controller extends (0, function_1.implement)(controller_1.default, validatesRequests_1.default) {
}
exports.default = Controller;
