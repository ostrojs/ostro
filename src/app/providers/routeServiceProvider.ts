import route from '@ostro/support/facades/route';
import ServiceProvider from '@ostro/foundation/providers/routeServiceProvider';
import { base_path } from '@ostro/support/function';

/**
 * Class RouteServiceProvider.
 */
class RouteServiceProvider extends ServiceProvider {
    
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    public override $namespace: string = base_path('app/http/controllers');

    /**
     * Layer handler in middleware for routes.
     *
     * @returns {void}
     */
    public override boot(): void {
        this.map();
    }

    /**
     * Define the routes for the application.
     *
     * @returns {void}
     */
    public map(): void {
        this.mapApiRoutes();
        this.mapWebRoutes();
    }

    /**
     * Map API routes.
     *
     * @returns {void}
     */
    protected mapApiRoutes(): void {
        route.prefix('api')
            .namespace(this.$namespace)
            .group(base_path('routes/api'));
    }
    
    /**
     * Map Web routes.
     *
     * @returns {void}
     */
    protected mapWebRoutes(): void {
        route.middleware('web')
            .namespace(this.$namespace)
            .group(base_path('routes/web'));
    }

}

export default RouteServiceProvider;