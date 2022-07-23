<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\RequestResetPasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('refresh',[AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('sendPasswordResetLink', [RequestResetPasswordController::class, 'sendEmail']);
    Route::post('resetPassword', [ResetPasswordController::class, 'resetPassword']);
});
