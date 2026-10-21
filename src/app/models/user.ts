import Authenticatable from '@ostro/foundation/auth/user';

/**
 * Class User.
 */
class User extends Authenticatable {

    protected $fillable: string[] = [
        'name',
        'email',
        'password',
    ];

    protected $hidden: string[] = [
        'password',
        'remember_token',
    ];

}

export default User;