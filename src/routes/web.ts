/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

import type { RouteContext, RouteRegistrar } from '@ostro/contracts/router';
import type { IHttpContext } from '@ostro/contracts/foundation/httpContext';

/**
 * Register web routes for the application.
 *
 * @param route - Route registrar instance.
 * @returns {void}
 */
function webRoutes(route: RouteRegistrar): void {
    route.get('/', function ({ view }: RouteContext): void {
        view('welcome');
    });
}

export type { RouteContext, RouteRegistrar, IHttpContext };
export default webRoutes;