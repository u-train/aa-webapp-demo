<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = $this->getAuthUser();
        Gate::authorize('viewAny', $user);

        $users = User::orderBy('id')->paginate(3);

        return Inertia::render('profiles', [
            /** @var User[] */
            'users' => $users->items(),
            'previousPage' => $users->previousPageUrl(),
            'currentPage' => $users->currentPage(),
            'nextPage' => $users->nextPageUrl(),
            'lastPage' => $users->lastPage(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $email)
    {
        $user = $this->getAuthUser();

        if ($email === 'self') {
            return to_route('users.show', ['user' => $user->email]);
        }
        $target_user = User::where('email', $email)->firstOrFail();

        Gate::authorize('view', $target_user);

        return Inertia::render('profile', [
            'target_user' => $this->toUser($target_user),
            'isUser' => (bool) $user->isUser(),
            'isAdmin' => (bool) $user->isAdmin(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $target_email)
    {
        $target_user = User::where('email', $target_email)->firstOrFail();

        Gate::authorize('update', $target_user);

        return Inertia::render('edit-profile', [
            'targetUser' => $this->toUser($target_user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $target_email)
    {
        $target_user = User::where('email', $target_email)->firstOrFail();

        Gate::authorize('update', $target_user);

        $input = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($target_user),
            ],
            'new_password' => ['nullable', Password::default(), 'confirmed'],
            'current_password' => ['nullable', 'required_unless:new_password,null', 'current_password'],
        ], [
            'current_password.required_unless' => 'The current password must be filled.',
        ]);

        if ($input['new_password']) {
            $target_user->forceFill([
                'password' => Hash::make($input['new_password']),
            ])->save();
        }

        if ($input['email'] !== $target_email) {
            $target_user->forceFill([
                'email' => $input['email'],
                'email_verified_at' => null,
            ])->save();

            $target_user->sendEmailVerificationNotification();
        }

        $target_user->fill([
            'name' => $input['name'],
        ])->save();

        return redirect()->route('users.edit', ['user' => $input['email']]);
    }

    private function getAuthUser(): User
    {
        return Auth::user();
    }

    private function toUser($x): User
    {
        return $x;
    }
}
