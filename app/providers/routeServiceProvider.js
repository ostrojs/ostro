const route = require('@ostro/support/facades/route')
const ServiceProvider = require('@ostro/foundation/providers/routeServiceProvider')
const WebRoutes = require('~/routes/web')
class RouteServiceProvider extends ServiceProvider {
    
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */

    $namespace = base_path('app/http/controllers')

    /**
     * Layer handler in middleware for routes
     *
     * @return void
     */
    boot() {
        this.map()
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    map() {
        this.mapApiRoutes()
        this.mapWebRoutes()
    }

    mapApiRoutes() {
        route.prefix('api')
            .namespace(this.namespace)
            .group(base_path('routes/api'))
    }
    
    mapWebRoutes() {
        route.middleware('web')
            .namespace(this.namespace)
            .group(base_path('routes/web'))
    }

}
module.exports = RouteServiceProvider