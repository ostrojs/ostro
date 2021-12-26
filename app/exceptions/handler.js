const ExceptionHandler = require('@ostro/foundation/exception/handler');

class Handler extends ExceptionHandler {

    $dontReport = [

    ];
    
    $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];
}
module.exports = Handler