module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Hash Driver
    |--------------------------------------------------------------------------
    |
    | Specifies which hashing driver your application will use by default to
    | hash passwords or other sensitive data. You can choose between strong
    | adaptive hashing like "bcrypt" or a more general-purpose "crypto" driver.
    |
    | Supported: "bcrypt", "crypto"
    |
    */
    'driver' : 'crypto',

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Configuration options specifically for the bcrypt driver. The "rounds"
    | setting controls the cost factor — the higher the number, the more
    | computationally expensive the hash function is, thus providing better
    | security at the expense of performance.
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
    | Configuration options for the generic crypto driver. The "rounds" here
    | might define iteration count or key stretching rounds, depending on
    | the underlying algorithm used. Usually faster but less secure for
    | password storage compared to bcrypt.
    |
    */
    'crypto' : {
        'rounds' : env('BCRYPT_ROUNDS', 10),
    }
    
}
