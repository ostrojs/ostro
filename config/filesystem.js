module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Specifies the default filesystem disk driver to use for all file storage.
    | This will be the primary disk unless explicitly overridden.
    |
    */
    'default': env('FILESYSTEM_DRIVER', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Specifies the default cloud filesystem disk driver. This is used for
    | cloud storage services such as Amazon S3 or Azure Blob Storage.
    |
    */
    'cloud': env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure multiple filesystem "disks" which represent
    | different storage locations and drivers. You can have multiple disks
    | using the same driver with different configurations.
    |
    | Supported drivers include "local", "azure", and "s3".
    |
    */
    'disks': {
        'local': {
            'driver': 'local', // Uses local server storage
            'root': storage_path('app'), // Root directory for files
            'encoding': 'utf8', // File encoding format
        },

        'session': {
            'driver': 'local', // Local storage for session files
            'root': storage_path('session'), // Directory for session data
            'encoding': 'utf8',
        },

        'xslt': {
            'driver': 'local', // Local storage for XSLT files
            'root': storage_path('xslt'),
            'encoding': 'utf8',
        },

        'public': {
            'driver': 'local', // Public accessible storage
            'root': public_path(''), // Points to the public directory
            'encoding': 'utf8',
        },

        'view': {
            'driver': 'local', // Local storage for compiled view files
            'root': view_path(''), // Path to view templates
            'encoding': 'utf8',
        },

        'azure': {
            'driver': 'azure', // Azure Blob Storage driver
            'key': env('FILESYSTEM_CLOUD_AZURE_KEY', env('FILESYSTEM_CLOUD_AZURE_KEY')), // Azure storage key
            'account': env('FILESYSTEM_CLOUD_AZURE_ACCOUNT', env('FILESYSTEM_CLOUD_AZURE_ACCOUNT')), // Azure account name
            'container': env('FILESYSTEM_CLOUD_AZURE_CONTAINER', env('FILESYSTEM_CLOUD_AZURE_CONTAINER')), // Azure container name
            'url': env('FILESYSTEM_CLOUD_AZURE_URL', env('FILESYSTEM_CLOUD_AZURE_URL')), // Azure base URL
        },

        's3': {
            'driver': 's3', // Amazon S3 cloud storage driver
            'key': env('AWS_ACCESS_KEY_ID'), // AWS access key ID
            'secret': env('AWS_SECRET_ACCESS_KEY'), // AWS secret access key
            'region': env('AWS_DEFAULT_REGION'), // AWS region (e.g. us-east-1)
            'bucket': env('AWS_BUCKET'), // AWS S3 bucket name
            'url': env('AWS_URL'), // Optional AWS URL override
            'endpoint': env('AWS_ENDPOINT'), // Optional custom endpoint for S3-compatible services
            'use_path_style_endpoint': env('AWS_USE_PATH_STYLE_ENDPOINT', false), // Use path-style URLs instead of subdomain-style
        }
    },
}
