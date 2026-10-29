"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = __importDefault(require("@ostro/foundation/exception/handler"));
/**
 * Class Handler.
 */
class Handler extends handler_1.default {
    $dontReport = [];
    $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];
}
exports.default = Handler;
