module.exports =  {

    /*
    |--------------------------------------------------------------------------
    | Default Log Channel
    |--------------------------------------------------------------------------
    |
    | Defines the default logging channel your application will use when
    | writing log messages. This should correspond to one of the keys
    | defined in the "channels" object below.
    |
    */
    'default' : env('LOG_CHANNEL', 'stack'),

    /*
    |--------------------------------------------------------------------------
    | Log Channels
    |--------------------------------------------------------------------------
    |
    | Contains configuration for all available log channels in your app.
    | Each channel represents a different way to handle and store log data.
    | Laravel uses the Monolog library under the hood, allowing you to select
    | from drivers like single file, daily files, syslog, console, or stacks.
    |
    | Available Drivers: "single", "daily", "syslog", "custom", "stack", "console"
    |
    */
    'channels' : {
        'stack' : {
            'driver' : 'stack',
            'channels' : ['single'],       // Stack combines multiple channels into one
            'ignore_exceptions' : false,   // Whether exceptions thrown by channels are ignored
        },
        
        'single' : {
            'driver' : 'single',           // Logs all messages to a single file
            'path' : storage_path(`logs/ostro.log`),
            'level' : 'debug',             // Minimum log level to record
        },

        'daily' : {
            'driver' : 'daily',            // Creates a new log file daily
            'path' : storage_path(`logs/ostro-%DATE%.log`),
            'date_pattern' : 'YYYY-MM-DD', // Date format for log filenames
            'level' : 'debug',
            'days' : 30,                   // How many days to keep logs before deleting
        },
      
        'console': {
            'driver' : 'console',          // Logs output to the console (stdout)
            'level' : 'debug',
        },
        
        'syslog' : {
            'driver' : 'syslog',           // Sends logs to the system syslog service
            'level' : 'debug',
        },
    },
};
