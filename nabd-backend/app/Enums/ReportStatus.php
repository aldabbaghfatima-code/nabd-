<?php

namespace App\Enums;

enum ReportStatus: string
{
    case Draft = 'draft';
    case UnderReview = 'under_review';
    case Completed = 'completed';

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'مسودة',
            self::UnderReview => 'قيد المراجعة',
            self::Completed => 'مكتمل',
        };
    }
}
