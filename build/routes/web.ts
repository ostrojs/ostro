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

import type { HttpContext, RouteRegistrar } from '@ostro/contracts/router';

/**
 * Register web routes for the application.
 *
 * @param route - Route registrar instance.
 * @returns {void}
 */
function webRoutes(route: RouteRegistrar): void {
    route.get('/', function ({ view }: HttpContext): void {
        view('welcome');
    });
}

export default webRoutes;