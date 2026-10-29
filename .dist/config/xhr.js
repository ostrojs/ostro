"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("node:http"));
const https = __importStar(require("node:https"));
const function_1 = require("@ostro/support/function");
const config = {
    /*
    |--------------------------------------------------------------------------
    | Default XHR Adapter
    |--------------------------------------------------------------------------
    |
    | Specifies which XHR (XMLHttpRequest) library/adapter will be used by default
    | when sending HTTP requests in your application. This should correspond to
    | one of the keys defined under the "requests" configuration below.
    |
    | Common adapters include:
    | - "axios" : Promise-based HTTP client for browser and node.js
    | - "request": Simplified HTTP client (deprecated but still used in some apps)
    |
    */
    'default': (0, function_1.env)('XHR_ADAPTER', 'axios'),
    /*
    |--------------------------------------------------------------------------
    | XHR Requests Configuration
    |--------------------------------------------------------------------------
    |
    | Configure the HTTP request libraries/drivers your application supports.
    | Each request driver can have its own options to customize behavior,
    | including timeouts, connection persistence, max content length, etc.
    |
    | The available drivers are:
    | - axios
    | - request
    |
    */
    'requests': {
        'axios': {
            'driver': 'axios',
            'options': {
                // Maximum size of the HTTP response body allowed. Infinity means no limit.
                'maxContentLength': Infinity,
                // HTTP agent to manage connection persistence (keep-alive).
                'httpAgent': new http.Agent({
                    keepAlive: true, // Keep TCP connections alive for reuse
                    keepAliveMsecs: (0, function_1.env)('XHR_KEEP_ALIVE_MSECS', 10000), // Time to keep alive in ms
                }),
                // HTTPS agent for secure requests with the same keep-alive options.
                'httpsAgent': new https.Agent({
                    keepAlive: true,
                    keepAliveMsecs: (0, function_1.env)('XHR_KEEP_ALIVE_MSECS', 10000),
                }),
                // Timeout for requests in milliseconds (default 5 minutes).
                'timeout': (0, function_1.env)('XHR_TIMEOUT', 300000),
            },
        },
        'request': {
            'driver': 'request',
            'options': {
                // Maximum response size allowed.
                'maxContentLength': Infinity,
                // Use 'forever' option to keep sockets open for reuse, similar to keep-alive.
                'forever': true,
                // Timeout in milliseconds for the request.
                'timeout': (0, function_1.env)('XHR_TIMEOUT', 300000),
            },
        },
    },
};
exports.default = config;
