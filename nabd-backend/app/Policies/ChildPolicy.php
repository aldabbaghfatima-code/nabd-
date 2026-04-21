<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Child;
use App\Models\User;

class ChildPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, [UserRole::Admin, UserRole::Therapist, UserRole::Supervisor]);
    }

    public function view(User $user, Child $child): bool
    {
        if ($user->role === UserRole::Admin || $user->role === UserRole::Supervisor) return true;
        if ($user->role === UserRole::Therapist) return $child->therapist_id === $user->id;
        if ($user->role === UserRole::Guardian) return $child->guardians()->where('user_id', $user->id)->exists();

        return false;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, [UserRole::Admin, UserRole::Therapist]);
    }

    public function update(User $user, Child $child): bool
    {
        if ($user->role === UserRole::Admin) return true;

        return $user->role === UserRole::Therapist && $child->therapist_id === $user->id;
    }

    public function delete(User $user, Child $child): bool
    {
        if ($user->role === UserRole::Admin) return true;

        return $user->role === UserRole::Therapist && $child->therapist_id === $user->id;
    }
}
