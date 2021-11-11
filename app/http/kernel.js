const HttpKernel = require('@ostro/foundation/http/kernel')
class Kernel extends HttpKernel {
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    get $defaultMiddlewares() {
        return [
            require('@ostro/http/middleware/crossOrigin'),
            require('@ostro/http/middleware/compression'),
            require('@ostro/http/middleware/serveStatic'),
            require('@ostro/http/middleware/bodyParserJson'),
            require('@ostro/http/middleware/bodyParserUrlEncoded'),
            require('@ostro/http/middleware/formParser'),
            require('@ostro/http/middleware/queryParser'),
            require('@ostro/auth/middleware/startAuth'),
        ]
    }

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    get $middlewareGroups() {
        return {
            'web': [
                require('@ostro/cookie/middleware/cookieParser'),
                require('@ostro/session/middleware/startSession'),
                require('~/app/http/middleware/verifyCsrfToken'),
            ]

        }
    }

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    get $namedMiddlewares() {
        return {
            'guest': require('~/app/http/middleware/redirectIfAuthenticated'),
            'auth': require('~/app/http/middleware/authenticate'),
        }
    }

}

module.exports = Kernel