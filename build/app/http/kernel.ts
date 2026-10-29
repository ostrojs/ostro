import HttpKernel from '@ostro/foundation/http/kernel';
import crossOrigin from '@ostro/http/middleware/crossOrigin';
import compression from '@ostro/http/middleware/compression';
import serveStatic from '@ostro/http/middleware/serveStatic';
import bodyParserJson from '@ostro/http/middleware/bodyParserJson';
import bodyParserUrlEncoded from '@ostro/http/middleware/bodyParserUrlEncoded';
import formParser from '@ostro/http/middleware/formParser';
import queryParser from '@ostro/http/middleware/queryParser';
import startAuth from '@ostro/auth/middleware/startAuth';
import cookieParser from '@ostro/cookie/middleware/cookieParser';
import startSession from '@ostro/session/middleware/startSession';
import verifyCsrfToken from './middleware/verifyCsrfToken';
import redirectIfAuthenticated from './middleware/redirectIfAuthenticated';
import authenticate from './middleware/authenticate';

/**
 * Class Kernel.
 */
class Kernel extends HttpKernel {
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    public override $defaultMiddlewares: unknown[] = [
        crossOrigin,
        compression,
        serveStatic,
        bodyParserJson,
        bodyParserUrlEncoded,
        formParser,
        queryParser,
        startAuth,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    public override $middlewareGroups: Record<string, unknown[]> = {
        'web': [
            cookieParser,
            startSession,
            verifyCsrfToken,
        ],
    };

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    public override $namedMiddlewares: Record<string, unknown> = {
        'guest': redirectIfAuthenticated,
        'auth': authenticate,
    };
}

export default Kernel;