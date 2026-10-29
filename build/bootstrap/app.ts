import '@ostro/support/helpers';
import Application from '@ostro/foundation/application';
import HttpKernel from '~/app/http/kernel';
import ConsoleKernel from '~/app/console/kernel';
import HandlerManager from '@ostro/foundation/exception/handlerManager';
import ExceptionHandler from '~/app/exceptions/handler';

const app: Application = new Application(process.cwd());

app.singleton(
    '@ostro/contracts/http/kernel',
    HttpKernel
);

app.singleton(
    '@ostro/contracts/console/kernel',
    ConsoleKernel
);

app.singleton(
    '@ostro/contracts/exception/handler',
    HandlerManager,
    ExceptionHandler
);

export default app;