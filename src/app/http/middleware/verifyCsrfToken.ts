import Middleware from '@ostro/foundation/http/middleware/verifyCsrfToken';

/**
 * Class VerifyCsrfToken.
 */
class VerifyCsrfToken extends Middleware {

    public override $addHttpCookie: boolean = true;

    public override $except: string[] = [

    ];
}

export default VerifyCsrfToken;