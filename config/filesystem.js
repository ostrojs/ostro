module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Specifies the default disk to be used by the application when storing
    | files. This should correspond to one of the disks defined in the
    | 'disks' section below. This option allows easy switching of storage
    | backends without changing the rest of your code.
    |
    */
    'default': env('FILESYSTEM_DRIVER', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Defines the default disk that should be used for cloud storage. This is
    | useful if your application needs to work with both local and cloud-based
    | storage services simultaneously.
    |
    */
    'cloud': env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you can configure multiple filesystem "disks", even multiple disks
    | of the same driver. Each disk represents a particular storage location
    | and driver combination. This makes it easy to interact with different
    | storage systems like local storage, Azure, or Amazon S3 in a unified way.
    |
    | Supported Drivers: "local", "azure", "s3"
    |
    */
    'disks': {
        'local': {
            'driver': 'local',
            'root': storage_path('app'),        // Path where files are stored locally
            'encoding': 'utf8',                 // File encoding used when reading/writing
        },

        'session': {
            'driver': 'local',
            'root': storage_path('session'),   // Separate local path for session files
            'encoding': 'utf8',
        },

        'xslt': {
            'driver': 'local',
            'root': storage_path('xslt'),      // Local path specifically for XSLT files
            'encoding': 'utf8',
        },

        'public': {
            'driver': 'local',
            'root': public_path(''),            // Public directory root for accessible files
            'encoding': 'utf8',
        },

        'view': {
            'driver': 'local',
            'root': view_path(''),              // Local path for storing view/template files
            'encoding': 'utf8',
        },

        'azure': {
            'driver': 'azure',                  // Azure Blob Storage driver
            'key': env('FILESYSTEM_CLOUD_AZURE_KEY'),
            'account': env('FILESYSTEM_CLOUD_AZURE_ACCOUNT'),
            'container': env('FILESYSTEM_CLOUD_AZURE_CONTAINER'),
            'url': env('FILESYSTEM_CLOUD_AZURE_URL'),
        },

        's3': {
            'driver': 's3',                    // Amazon S3 driver
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
