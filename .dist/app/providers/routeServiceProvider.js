"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("@ostro/support/facades/route"));
const routeServiceProvider_1 = __importDefault(require("@ostro/foundation/providers/routeServiceProvider"));
const function_1 = require("@ostro/support/function");
/**
 * Class RouteServiceProvider.
 */
class RouteServiceProvider extends routeServiceProvider_1.default {
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    $namespace = (0, function_1.base_path)('app/http/controllers');
    /**
     * Layer handler in middleware for routes.
     *
     * @returns {void}
     */
    boot() {
        this.map();
    }
    /**
     * Define the routes for the application.
     *
     * @returns {void}
     */
    map() {
        this.mapApiRoutes();
        this.mapWebRoutes();
    }
    /**
     * Map API routes.
     *
     * @returns {void}
     */
    mapApiRoutes() {
        route_1.default.prefix('api')
            .namespace(this.$namespace)
            .group((0, function_1.base_path)('routes/api'));
    }
    /**
     * Map Web routes.
     *
     * @returns {void}
     */
    mapWebRoutes() {
        route_1.default.middleware('web')
            .namespace(this.$namespace)
            .group((0, function_1.base_path)('routes/web'));
    }
}
exports.default = RouteServiceProvider;
