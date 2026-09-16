<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::resource('users', UserController::class, [])->middleware(['auth', 'verified']);
Route::inertia('/', 'welcome')->name('home');
