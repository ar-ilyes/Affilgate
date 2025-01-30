<?php

use App\Http\Controllers\Auth\SocialiteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->to(config('app.ui_url'));
});

Route::get('/debug', function () {
    return "aze";
});

Route::prefix('socialite')->group(function () {
    Route::get('redirect/{provider}', [SocialiteController::class, 'redirect']);
    Route::get('callback/{provider}', [SocialiteController::class, 'callback']);
});
