"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyCsrfToken_1 = __importDefault(require("@ostro/foundation/http/middleware/verifyCsrfToken"));
/**
 * Class VerifyCsrfToken.
 */
class VerifyCsrfToken extends verifyCsrfToken_1.default {
    $addHttpCookie = true;
    $except = [];
}
exports.default = VerifyCsrfToken;
