require('@ostro/support/helpers')
const app = new(require('@ostro/foundation/application'))(process.cwd())

app.singleton(
    '@ostro/contracts/http/kernel',
    require('../app/http/kernel')
);

app.singleton(
    '@ostro/contracts/console/kernel',
    require('../app/console/kernel')
);

app.singleton(
    '@ostro/contracts/exception/handler',
    require('@ostro/foundation/exception/handlerManager'),
    require('../app/exceptions/handler')
);

module.exports = app