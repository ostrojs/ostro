"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = __importDefault(require("@ostro/foundation/console/kernel"));
/**
 * Class Kernel.
 */
class Kernel extends kernel_1.default {
    $commands = {};
    /**
     * Register the commands for the application.
     *
     * @returns {void}
     */
    commands() {
        this.load(__dirname + '/commands');
    }
}
exports.default = Kernel;
