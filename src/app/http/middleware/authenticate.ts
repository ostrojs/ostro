import Middleware from '@ostro/auth/middleware/authenticate';
import type { IHttpRequest } from '@ostro/contracts/http/request';

/**
 * Class Authenticate.
 */
class Authenticate extends Middleware {

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param $request - Incoming HTTP request instance.
     * @returns Redirect URL or undefined if JSON is expected.
     */
    public override redirectTo($request: IHttpRequest): string | undefined {
        if (!$request.expectsJson()) {
            return '/login';
        }
    }
}

export default Authenticate;