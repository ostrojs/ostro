"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redirectIfAuthenticated_1 = __importDefault(require("@ostro/auth/middleware/redirectIfAuthenticated"));
/**
 * Class RedirectIfAuthenticated.
 */
class RedirectIfAuthenticated extends redirectIfAuthenticated_1.default {
    /**
     * Get the path the user should be redirected to when they are authenticated.
     *
     * @returns Redirect URL path.
     */
    redirectTo() {
        return '/dashboard';
    }
}
exports.default = RedirectIfAuthenticated;
