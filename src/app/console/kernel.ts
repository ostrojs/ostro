import ConsoleKernel from '@ostro/foundation/console/kernel';

/**
 * Class Kernel.
 */
class Kernel extends ConsoleKernel {

    public override $commands: Record<string, unknown> = {};

    /**
     * Register the commands for the application.
     *
     * @returns {void}
     */
    public override commands(): void {
        this.load(__dirname + '/commands');
    }

}

export default Kernel;