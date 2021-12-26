const Middleware = require('@ostro/auth/middleware/redirectIfAuthenticated')

class RedirectIfAuthenticated extends Middleware {

    redirectTo() {
        return '/dashboard';
    }
}

module.exports = RedirectIfAuthenticated