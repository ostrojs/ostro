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

import type { HttpContext, RouteRegistrar } from '@ostro/contracts/router';

/**
 * Register API routes for the application.
 *
 * @param route - Route registrar instance.
 * @returns {void}
 */
function apiRoutes(route: RouteRegistrar): void {
    route.get('user', async function ({ request, response }: HttpContext): Promise<void> {
        response.send(await request.user?.());
    }).middleware('auth:api');
}

export default apiRoutes;