<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Session;
use App\Models\User;

class SessionPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, [UserRole::Admin, UserRole::Therapist, UserRole::Supervisor]);
    }

    public function view(User $user, Session $session): bool
    {
        if ($user->role === UserRole::Admin || $user->role === UserRole::Supervisor) return true;

        return $session->therapist_id === $user->id;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, [UserRole::Admin, UserRole::Therapist]);
    }

    public function update(User $user, Session $session): bool
    {
        if ($user->role === UserRole::Admin) return true;

        return $session->therapist_id === $user->id;
    }

    public function delete(User $user, Session $session): bool
    {
        if ($user->role === UserRole::Admin) return true;

        return $session->therapist_id === $user->id;
    }
}
