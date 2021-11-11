module.exports = {
    'default': env('VIEW_ENGINE', 'ejs'),

    'engines': {
        
        'ejs': {
            'driver': 'ejs',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {
                async: true,
            },
            'root': view_path(),
        },

        'twig': {
            'driver': 'twig',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {
                allowInlineIncludes: true,
                rethrow: true,
                async: true
            },
            'root': view_path(),
        },

        'pug': {
            'driver': 'pug',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {},
            'root': view_path(),
        },

        'nunjucks': {
            'driver': 'nunjucks',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {
                tags: {
                    blockStart: '{%',
                    blockEnd: '%}',
                    variableStart: '{{',
                    variableEnd: '}}',
                    commentStart: '{#',
                    commentEnd: '#}'
                }
            },
            'root': view_path(),
        },

        'handlebar': {
            'driver': 'handlebar',
            'extension': 'html',
            'cache': env('VIEW_CACHE', false),
            'options': {},
            'root': view_path(),
        }

    },
}