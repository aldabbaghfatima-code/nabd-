<?php

namespace App\Models;

use App\Enums\UserRole;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'organization',
        'role',
        'avatar',
        'language',
        'dark_mode',
        'notifications_enabled',
        'two_factor_enabled',
        'two_factor_secret',
        'is_active',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
            'dark_mode' => 'boolean',
            'notifications_enabled' => 'boolean',
            'two_factor_enabled' => 'boolean',
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
        ];
    }

    public function children(): HasMany
    {
        return $this->hasMany(Child::class, 'therapist_id');
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class, 'therapist_id');
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class, 'therapist_id');
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'therapist_id');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'author_id');
    }

    public function isAdmin(): bool
    {
        return $this->role === UserRole::ADMIN;
    }

    public function isTherapist(): bool
    {
        return $this->role === UserRole::THERAPIST;
    }

    public function isSupervisor(): bool
    {
        return $this->role === UserRole::SUPERVISOR;
    }

    public function isGuardian(): bool
    {
        return $this->role === UserRole::GUARDIAN;
    }
}