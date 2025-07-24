module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Hash Driver
    |--------------------------------------------------------------------------
    |
    | This option specifies which hashing algorithm will be used by default
    | when hashing passwords or other sensitive data in your application.
    | 
    | Supported options:
    | - "bcrypt": Uses the bcrypt algorithm, which is a strong adaptive
    |   hashing function designed for password hashing.
    | - "crypto": Uses the Node.js built-in crypto module for hashing, 
    |   which may use different algorithms (e.g., SHA256). Generally faster,
    |   but less secure for password hashing compared to bcrypt.
    | 
    | You can change this value depending on your security and performance needs.
    |
    */

    'driver' : 'crypto',

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Configuration options for the bcrypt hashing algorithm. The "rounds"
    | option controls the cost factor which influences the time required
    | to compute the hash. Higher rounds increase security but also CPU load.
    |
    | Typical values are between 8 and 12. Adjust this according to your
    | application’s performance and security requirements.
    |
    */

    'bcrypt' : {
        'rounds' : env('BCRYPT_ROUNDS', 8),
    },
    
    /*
    |--------------------------------------------------------------------------
    | Crypto Options
    |--------------------------------------------------------------------------
    |
    | Configuration options for the crypto hashing driver. The "rounds"
    | parameter here could refer to the number of iterations or key stretching
    | rounds depending on the algorithm used internally.
    |
    | Since "crypto" is a generic hashing mechanism, the exact effect of this
    | setting may vary. It is usually faster than bcrypt but may not provide
    | the same level of security for password storage.
    |
    */

    'crypto' : {
        'rounds' : env('BCRYPT_ROUNDS', 10),
    }

}
