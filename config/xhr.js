let http = require('http');
let https = require('https');

module.exports = {
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
  'default': env('XHR_ADAPTER', 'axios'),

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
          keepAliveMsecs: env('XHR_KEEP_ALIVE_MSECS', 10000), // Time to keep alive in ms
        }),

        // HTTPS agent for secure requests with the same keep-alive options.
        'httpsAgent': new https.Agent({
          keepAlive: true,
          keepAliveMsecs: env('XHR_KEEP_ALIVE_MSECS', 10000),
        }),

        // Timeout for requests in milliseconds (default 5 minutes).
        'timeout': env('XHR_TIMEOUT', 300000),
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
        'timeout': env('XHR_TIMEOUT', 300000),
      },
    },
  },
};
