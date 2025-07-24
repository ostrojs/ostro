module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default View Engine
  |--------------------------------------------------------------------------
  |
  | Specifies the default templating engine your application will use to
  | render views if you don't explicitly specify an engine elsewhere.
  | This should match one of the keys in the 'engines' object below.
  |
  | Example: 'ejs', 'twig', 'pug', 'nunjucks', 'handlebars'
  |
  */
  default: env('VIEW_ENGINE', 'ejs'),

  /*
  |--------------------------------------------------------------------------
  | View Engines Configuration
  |--------------------------------------------------------------------------
  |
  | Defines the configuration options for each supported view engine.
  | Each engine config includes:
  |   - driver: The identifier of the engine, used internally
  |   - extension: File extension for templates for this engine
  |   - cache: Whether to enable template caching (improves performance)
  |   - options: Engine-specific options, like enabling async rendering
  |   - root: The root directory where templates for this engine are stored
  |
  | You can add more engines or customize options for existing ones here.
  |
  */
  engines: {
    /*
    |--------------------------------------------------------------------------
    | EJS Configuration
    |--------------------------------------------------------------------------
    | Embedded JavaScript templates, simple and popular.
    | Supports asynchronous rendering when async option is true.
    */
    ejs: {
      driver: 'ejs',
      extension: 'html', // Use '.html' extension for EJS templates here
      cache: env('VIEW_CACHE', false), // Enable/disable caching via env var
      options: {
        async: true, // Enable async rendering (recommended for latest EJS)
      },
      root: view_path(), // Base path for EJS view files
    },

    /*
    |--------------------------------------------------------------------------
    | Twig Configuration
    |--------------------------------------------------------------------------
    | Twig is a flexible, secure templating engine inspired by Symfony.
    | Supports inline includes, async rendering, and error propagation.
    */
    twig: {
      driver: 'twig',
      extension: 'html', // Twig templates with .html extension
      cache: env('VIEW_CACHE', false),
      options: {
        allowInlineIncludes: true, // Allows including templates inline
        rethrow: true, // Rethrow errors instead of hiding them
        async: true, // Enable async template rendering
      },
      root: view_path(),
    },

    /*
    |--------------------------------------------------------------------------
    | Pug Configuration
    |--------------------------------------------------------------------------
    | Pug is a clean, whitespace-sensitive template engine formerly known
    | as Jade. It's concise and highly readable.
    */
    pug: {
      driver: 'pug',
      extension: 'html', // Using '.html' but can be '.pug'
      cache: env('VIEW_CACHE', false),
      options: {}, // Add pug-specific options here if needed
      root: view_path(),
    },

    /*
    |--------------------------------------------------------------------------
    | Nunjucks Configuration
    |--------------------------------------------------------------------------
    | Nunjucks is a powerful templating engine with Django-like syntax.
    | Supports customizable tag delimiters and caching.
    */
    nunjucks: {
      driver: 'nunjucks',
      extension: 'html', // Nunjucks template extension
      cache: env('VIEW_CACHE', false),
      options: {
        tags: {
          blockStart: '{%',    // Start of block tag
          blockEnd: '%}',      // End of block tag
          variableStart: '{{', // Start of variable output
          variableEnd: '}}',   // End of variable output
          commentStart: '{#',  // Start of comment tag
          commentEnd: '#}',    // End of comment tag
        },
      },
      root: view_path(),
    },

    /*
    |--------------------------------------------------------------------------
    | Handlebars Configuration
    |--------------------------------------------------------------------------
    | Handlebars is a logic-less templating engine emphasizing simplicity.
    | Supports templates with '.html' or '.hbs' extensions, helpers, and partials.
    */
    handlebars: {
      driver: 'handlebars',
      extension: 'html', // You may prefer '.hbs' here for clarity
      cache: env('VIEW_CACHE', false),
      options: {}, // Handlebars-specific options can be added here
      root: view_path(),
    },
  },
};
