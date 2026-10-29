"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = __importDefault(require("@ostro/foundation/http/kernel"));
const crossOrigin_1 = __importDefault(require("@ostro/http/middleware/crossOrigin"));
const compression_1 = __importDefault(require("@ostro/http/middleware/compression"));
const serveStatic_1 = __importDefault(require("@ostro/http/middleware/serveStatic"));
const bodyParserJson_1 = __importDefault(require("@ostro/http/middleware/bodyParserJson"));
const bodyParserUrlEncoded_1 = __importDefault(require("@ostro/http/middleware/bodyParserUrlEncoded"));
const formParser_1 = __importDefault(require("@ostro/http/middleware/formParser"));
const queryParser_1 = __importDefault(require("@ostro/http/middleware/queryParser"));
const startAuth_1 = __importDefault(require("@ostro/auth/middleware/startAuth"));
const cookieParser_1 = __importDefault(require("@ostro/cookie/middleware/cookieParser"));
const startSession_1 = __importDefault(require("@ostro/session/middleware/startSession"));
const verifyCsrfToken_1 = __importDefault(require("./middleware/verifyCsrfToken"));
const redirectIfAuthenticated_1 = __importDefault(require("./middleware/redirectIfAuthenticated"));
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
/**
 * Class Kernel.
 */
class Kernel extends kernel_1.default {
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    $defaultMiddlewares = [
        crossOrigin_1.default,
        compression_1.default,
        serveStatic_1.default,
        bodyParserJson_1.default,
        bodyParserUrlEncoded_1.default,
        formParser_1.default,
        queryParser_1.default,
        startAuth_1.default,
    ];
    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    $middlewareGroups = {
        'web': [
            cookieParser_1.default,
            startSession_1.default,
            verifyCsrfToken_1.default,
        ],
    };
    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    $namedMiddlewares = {
        'guest': redirectIfAuthenticated_1.default,
        'auth': authenticate_1.default,
    };
}
exports.default = Kernel;
