module.exports = {
    
    'default': env('FILESYSTEM_DRIVER', 'local'),

    'cloud': env('FILESYSTEM_CLOUD', 's3'),
    
    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "azure", "s3"
    |
    */
    'disks': {
        'local': {
            'driver': 'local',
            'root': storage_path('app'),
            'encoding': 'utf8',
        },

        'session': {
            'driver': 'local',
            'root': storage_path('session'),
            'encoding': 'utf8',
        },

        'xslt': {
            'driver': 'local',
            'root': storage_path('xslt'),
            'encoding': 'utf8'
        },

        'public': {
            'driver': 'local',
            'root': public_path(''),
            'encoding': 'utf8',
        },

        'view': {
            'driver': 'local',
            'root': view_path(''),
            'encoding': 'utf8',
        },

        'azure': {
            'driver': 'azure',
            'key': env('FILESYSTEM_CLOUD_AZURE_KEY', env('FILESYSTEM_CLOUD_AZURE_KEY')),
            'account': env('FILESYSTEM_CLOUD_AZURE_ACCOUNT', env('FILESYSTEM_CLOUD_AZURE_ACCOUNT')),
            'container': env('FILESYSTEM_CLOUD_AZURE_CONTAINER', env('FILESYSTEM_CLOUD_AZURE_CONTAINER')),
            'url': env('FILESYSTEM_CLOUD_AZURE_URL', env('FILESYSTEM_CLOUD_AZURE_URL')),
        },

        's3': {
            'driver': 's3',
            'key': env('AWS_ACCESS_KEY_ID'),
            'secret': env('AWS_SECRET_ACCESS_KEY'),
            'region': env('AWS_DEFAULT_REGION'),
            'bucket': env('AWS_BUCKET'),
            'url': env('AWS_URL'),
            'endpoint': env('AWS_ENDPOINT'),
            'use_path_style_endpoint': env('AWS_USE_PATH_STYLE_ENDPOINT', false),
        }
    },
}