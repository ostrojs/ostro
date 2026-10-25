import Authenticatable from '@ostro/foundation/auth/user';

/**
 * Class User.
 */
class User extends Authenticatable {

    public $fillable: string[] = [
        'name',
        'email',
        'password',
    ];

    public $hidden: string[] = [
        'password',
        'remember_token',
    ];

}

export default User;