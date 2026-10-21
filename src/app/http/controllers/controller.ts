import BaseController from '@ostro/router/controller';
import validatesRequests from '@ostro/foundation/validation/validatesRequests';
import { implement } from '@ostro/support/function';
import type { IHttpContext } from '@ostro/contracts/foundation/httpContext';
import type { IHttpRequest } from '@ostro/contracts/http/request';
import type { IHttpResponse } from '@ostro/contracts/http/response';

/**
 * Class Controller.
 */
class Controller extends implement(BaseController, validatesRequests) {

}

export type { IHttpContext, IHttpRequest, IHttpResponse };
export default Controller;