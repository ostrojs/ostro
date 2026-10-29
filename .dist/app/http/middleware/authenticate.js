"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = __importDefault(require("@ostro/auth/middleware/authenticate"));
/**
 * Class Authenticate.
 */
class Authenticate extends authenticate_1.default {
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param $request - Incoming HTTP request instance.
     * @returns Redirect URL or undefined if JSON is expected.
     */
    redirectTo($request) {
        if (!$request.expectsJson()) {
            return '/login';
        }
    }
}
exports.default = Authenticate;
