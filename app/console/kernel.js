const ConsoleKernel = require('@ostro/foundation/console/kernel')
class Kernel extends ConsoleKernel{

	$commands = {};

    /**
     * Register the commands for the application.
     *
     * @return {void}
     */
    commands()
    {
        this.load(__dirname+'/commands');
    }

}
module.exports = Kernel