<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default (or site-wide) Scheme
    |--------------------------------------------------------------------------
    |
    | The default scheme will be applied to every page of the site.
    | By default, you probably won't want to protect anything
    | at all, but you are free to select one if necessary.
    |
    */

    'default' => env('STATAMIC_PROTECT_DEFAULT'),

    /*
    |--------------------------------------------------------------------------
    | Protection Schemes
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the protection schemes for your application
    | as well as their drivers. You may even define multiple schemes for
    | the same driver to easily protect different types of pages.
    |
    | Supported drivers: "ip_address", "auth", "password"
    |
    */

    'schemes' => [

        'ip_address' => [
            'driver'  => 'ip_address',
            'allowed' => ['127.0.0.1'],
        ],

        'logged_in' => [
            'driver'          => 'auth',
            'login_url'       => '/login',
            'append_redirect' => false,
        ],

        'password' => [
            'driver'   => 'password',
            'allowed'  => explode(',', env('STATAMIC_PROTECT_SCHEMES_PASSWORD_ALLOWED', 'secret')),
            'form_url' => null,
        ],

    ],

];
