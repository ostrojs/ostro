const Middleware = require('@ostro/foundation/http/middleware/verifyCsrfToken')

class VerifyCsrfToken extends Middleware{
	
    $addHttpCookie = true;

    $except = [];
}

module.exports = VerifyCsrfToken ;