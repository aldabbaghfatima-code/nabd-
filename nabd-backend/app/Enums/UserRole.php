<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Therapist = 'therapist';
    case Supervisor = 'supervisor';
    case Guardian = 'guardian';

    public function label(): string
    {
        return match ($this) {
            self::Admin => 'مدير النظام',
            self::Therapist => 'معالج',
            self::Supervisor => 'مشرف',
            self::Guardian => 'ولي أمر',
        };
    }
}
