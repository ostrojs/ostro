const Middleware = require('@ostro/auth/middleware/redirectIfAuthenticated')

class RedirectIfAuthenticated extends Middleware {

    redirectTo() {
        return route('admin.dashboard.index');
    }
}

module.exports = RedirectIfAuthenticated