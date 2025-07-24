let http = require('http');
let https = require('https');

module.exports =  {
    /*
    |--------------------------------------------------------------------------
    | Default XHR Adapter
    |--------------------------------------------------------------------------
    |
    | This option sets the default adapter that will be used for all XHR (HTTP)
    | requests initiated by your application. It defines which library or
    | module should handle outgoing HTTP calls, unless explicitly overridden.
    |
    | Supported: "axios", "request"
    |
    */
    'default' : env('XHR_ADAPTER', 'axios'),

    /*
    |--------------------------------------------------------------------------
    | XHR Requests Configuration
    |--------------------------------------------------------------------------
    |
    | In this section, you can configure the available XHR (XMLHttpRequest)
    | drivers for making HTTP requests within your app.
    |
    | Each driver has its own settings such as timeout, keep-alive, and
    | transport agents. This allows fine-tuned control over network calls.
    |
    | You may register multiple request adapters, and switch them based on
    | use case. Below are supported configurations for "axios" and "request".
    |
    */
    'requests' : {

        'axios' : {
            'driver' : 'axios',

            /*
            |--------------------------------------------------------------------------
            | Axios Options
            |--------------------------------------------------------------------------
            |
            | Configuration for axios-based HTTP requests.
            |
            | - maxContentLength: Controls the maximum response size (Infinity means unlimited).
            | - httpAgent / httpsAgent: Node.js agents to reuse sockets (keep-alive).
            | - timeout: The maximum time (in ms) before the request is aborted.
            |
            */
            'options': {
                'maxContentLength': Infinity,
                'httpAgent': new http.Agent({ 
                    keepAlive: true,
                    keepAliveMsecs: env('XHR_KEEP_ALIVE_MSECS', 10000)
                }),
                'httpsAgent': new https.Agent({ 
                    keepAlive: true,
                    keepAliveMsecs: env('XHR_KEEP_ALIVE_MSECS', 10000)
                }),
                'timeout': env('XHR_TIMEOUT', 300000),
            },
        },

        'request' : {
            'driver' : 'request',

            /*
            |--------------------------------------------------------------------------
            | Request Module Options
            |--------------------------------------------------------------------------
            |
            | Configuration for the legacy "request" library (deprecated but still usable).
            |
            | - maxContentLength: Maximum allowed response body size.
            | - forever: Enables keep-alive connections.
            | - timeout: Max request time before aborting (in milliseconds).
            |
            */
            'options': {
                'maxContentLength': Infinity,
                'forever': true,
                'timeout': env('XHR_TIMEOUT', 300000),
            },
        }
    }
};
