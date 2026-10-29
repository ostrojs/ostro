"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Register API routes for the application.
 *
 * @param route - Route registrar instance.
 * @returns {void}
 */
function apiRoutes(route) {
    route.get('user', async function ({ request, response }) {
        response.send(await request.user());
    }).middleware('auth:api');
}
exports.default = apiRoutes;
