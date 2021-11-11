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

module.exports = function(route) {
    route.get('user', async function ({request,response}) {
         response.send(await request.user());
    }).middleware('auth:api')
}