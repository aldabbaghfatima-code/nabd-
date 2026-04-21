<?php

namespace App\Enums;

enum SessionStatus: string
{
    case Scheduled = 'scheduled';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::Scheduled => 'مجدولة',
            self::InProgress => 'جارية',
            self::Completed => 'مكتملة',
            self::Cancelled => 'ملغاة',
        };
    }
}
