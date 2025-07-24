module.exports = {
    /*
    |--------------------------------------------------------------------------
    | Default View Engine
    |--------------------------------------------------------------------------
    |
    | This option sets the default templating engine your application will
    | use to render views. It determines which engine will process your
    | templates if you don't explicitly specify one.
    |
    | Supported engines include: 'ejs', 'twig', 'pug', 'nunjucks', 'handlebar'
    |
    */
    'default': env('VIEW_ENGINE', 'ejs'),

    /*
    |--------------------------------------------------------------------------
    | View Engines Configuration
    |--------------------------------------------------------------------------
    |
    | Here you can configure settings for each supported view engine. Each
    | engine has its own driver, file extension, caching behavior, and
    | additional options tailored to how that templating system works.
    |
    | The 'root' option defines the base directory where your views/templates
    | are stored (typically your views folder).
    |
    */
    'engines': {

        'ejs': {
            'driver': 'ejs',
            'extension': 'html', // File extension for templates
            'cache': env('VIEW_CACHE', false), // Enable/disable caching of compiled templates
            'options': {
                async: true, // Enable async rendering support for EJS
            },
            'root': view_path(), // Base path for EJS view files
        },

        'twig': {
            'driver': 'twig',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {
                allowInlineIncludes: true, // Allow including templates inline inside other templates
                rethrow: true,             // Rethrow errors instead of silently failing
                async: true                // Enable asynchronous rendering
            },
            'root': view_path(),
        },

        'pug': {
            'driver': 'pug',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {}, // Pug-specific options can be added here
            'root': view_path(),
        },

        'nunjucks': {
            'driver': 'nunjucks',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {
                tags: {
                    blockStart: '{%',    // Custom tag syntax start for blocks
                    blockEnd: '%}',      // Custom tag syntax end for blocks
                    variableStart: '{{', // Custom tag syntax start for variables
                    variableEnd: '}}',   // Custom tag syntax end for variables
                    commentStart: '{#',  // Custom tag syntax start for comments
                    commentEnd: '#}'     // Custom tag syntax end for comments
                }
            },
            'root': view_path(),
        },

        'handlebar': {
            'driver': 'handlebar',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {}, // Handlebars-specific options can be added here
            'root': view_path(),
        }

    },
}
