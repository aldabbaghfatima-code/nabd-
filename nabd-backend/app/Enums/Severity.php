<?php

namespace App\Enums;

enum Severity: string
{
    case Mild = 'mild';
    case Moderate = 'moderate';
    case Severe = 'severe';

    public function label(): string
    {
        return match ($this) {
            self::Mild => 'خفيف',
            self::Moderate => 'متوسط',
            self::Severe => 'شديد',
        };
    }
}
