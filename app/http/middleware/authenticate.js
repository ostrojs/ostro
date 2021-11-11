const Middleware = require('@ostro/auth/middleware/authenticate')
class Authenticate extends Middleware {

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     */
    redirectTo($request) {
        if (!$request.expectsJson()) {
            return '/login';
        }
    }
}

module.exports = Authenticate