<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Carbon\Carbon;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

        Fortify::loginView(function ($request) {
            return Inertia::render('login', [
                'successfulResetPasswordMessage' => $request->session()->get('status'),
            ]);
        });

        Fortify::registerView(function () {
            return Inertia::render('register', []);
        });

        Fortify::verifyEmailView(function ($request) {
            $currentTime = Carbon::now();
            $account_creation_time = $request->user()->created_at;
            $minutes = $account_creation_time->diffInMinutes($currentTime);

            return Inertia::render('verify-email', [
                'wasAccountMadeRecently' => $minutes < 10.0
            ]);
        });

        Fortify::requestPasswordResetLinkView(function ($request) {
            return Inertia::render('reset-password', [
                'passwordResetMessage' => $request->session()->get('status'),
            ]);
        });

        Fortify::resetPasswordView(function ($request) {
            return Inertia::render('reset-complete-password', [
                'email' => $request->input('email'),
                'token' => $request->route('token')
            ]);
        });
    }
}
