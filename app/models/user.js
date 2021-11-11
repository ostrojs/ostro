const Authenticatable = require('@ostro/foundation/auth/user')

class User extends Authenticatable {

    $fillable = [
        'name',
        'email',
        'password'
    ]

    $hidden = [
        'password',
        'remember_token'
    ]

   
}

module.exports = User