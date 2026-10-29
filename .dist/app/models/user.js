"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("@ostro/foundation/auth/user"));
/**
 * Class User.
 */
class User extends user_1.default {
    $fillable = [
        'name',
        'email',
        'password',
    ];
    $hidden = [
        'password',
        'remember_token',
    ];
}
exports.default = User;
