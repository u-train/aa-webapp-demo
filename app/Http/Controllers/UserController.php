<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {}

    private function getAuthUser(): User
    {
        return Auth::user();
    }

    private function toUser($x): User
    {
        return $x;
    }
}
