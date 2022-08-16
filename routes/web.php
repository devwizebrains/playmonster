<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{brand}/playbox', 'PlayboxController@preview');
Route::get('generate-playbox/{id}', 'PlayboxController@generate');
Route::post('pb/create', 'PlayboxController@create');
Route::statamic('playbox', 'playbox.show');

Route::statamic('login', 'protect.login', ['layout' => 'protect.layout']);