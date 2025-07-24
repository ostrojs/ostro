module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Default Hash Driver
    |--------------------------------------------------------------------------
    |
    | Specifies the default hashing algorithm to use for passwords or sensitive data.
    | Supported drivers:
    | - "bcrypt": Strong adaptive password hashing.
    | - "crypto": Uses Node.js crypto module (e.g., SHA256). Faster but less secure for passwords.
    |
    */
    'driver': 'crypto',

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Options for the bcrypt algorithm. The "rounds" value controls the cost factor,
    | increasing security but also CPU usage. Recommended range is 8-12.
    |
    */
    'bcrypt': {
        'rounds': env('BCRYPT_ROUNDS', 8),
    },

    /*
    |--------------------------------------------------------------------------
    | Crypto Options
    |--------------------------------------------------------------------------
    |
    | Options for the crypto driver. The "rounds" value can control iterations or
    | key stretching depending on implementation. Usually faster but less secure
    | than bcrypt for password hashing.
    |
    */
    'crypto': {
        'rounds': env('CRYPTO_ROUNDS', 10),
    }

}
