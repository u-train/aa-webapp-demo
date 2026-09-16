<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if (! ($user->isUser())) {
            return false;
        }

        return $user->email === $model->email;
    }

    /**
     * Determine whether the user can create models.
     * This is always false because no user can ever make a new user.
     * Registeration is handled separately.
     */
    public function create(User $_user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        return $user->email === $model->email;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $_user, User $_model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $_user, User $_model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $_user, User $_model): bool
    {
        return false;
    }
}
