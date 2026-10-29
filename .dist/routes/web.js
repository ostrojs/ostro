"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Register web routes for the application.
 *
 * @param route - Route registrar instance.
 * @returns {void}
 */
function webRoutes(route) {
    route.get('/', function ({ view }) {
        view('welcome');
    });
}
exports.default = webRoutes;
