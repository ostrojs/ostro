module.exports =  {

    /*
    |--------------------------------------------------------------------------
    | Default Log Channel
    |--------------------------------------------------------------------------
    |
    | Defines the default log channel used when writing log messages.
    | The value should match one of the channels defined below.
    |
    */
    'default' : env('LOG_CHANNEL', 'stack'),

    /*
    |--------------------------------------------------------------------------
    | Log Channels
    |--------------------------------------------------------------------------
    |
    | Configure the log channels for your Ostro application here.
    | Each channel uses a specific driver and options for logging.
    |
    | Available Drivers: "single", "daily", "syslog", "custom", "stack", "console"
    |
    */
    'channels' : {
        'stack' : {
            'driver' : 'stack',
            'channels' : ['single'],
            'ignore_exceptions' : false,
        },
        
        'single' : {
            'driver' : 'single',
            'path' : storage_path(`logs/ostro.log`),
            'level' : 'debug',
        },

        'daily' : {
            'driver' : 'daily',
            'path' : storage_path(`logs/ostro-%DATE%.log`),
            'date_pattern' : 'YYYY-MM-DD',
            'level' : 'debug',
            'days' : 30,
        },
      
        'console':{
            'driver' : 'console',
            'level' : 'debug',
        },
        
        'syslog' : {
            'driver' : 'syslog',
            'level' : 'debug',
        },
    },
};
