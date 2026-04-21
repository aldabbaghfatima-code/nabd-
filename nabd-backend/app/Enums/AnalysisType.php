<?php

namespace App\Enums;

enum AnalysisType: string
{
    case RealTime = 'real_time';
    case Video = 'video';

    public function label(): string
    {
        return match ($this) {
            self::RealTime => 'تحليل لحظي',
            self::Video => 'تحليل فيديو',
        };
    }
}
