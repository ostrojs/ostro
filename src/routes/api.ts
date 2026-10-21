/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

import type { RouteContext, RouteRegistrar } from '@ostro/contracts/router';
import type { IHttpRequest } from '@ostro/contracts/http/request';
import type { IHttpResponse } from '@ostro/contracts/http/response';

/**
 * Register API routes for the application.
 *
 * @param route - Route registrar instance.
 * @returns {void}
 */
function apiRoutes(route: RouteRegistrar): void {
    route.get('user', async function ({ request, response }: RouteContext): Promise<void> {
        response.send(await request.user());
    }).middleware('auth:api');
}

export type { RouteContext, RouteRegistrar, IHttpRequest, IHttpResponse };
export default apiRoutes;