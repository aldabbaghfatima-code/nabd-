<?php

namespace App\Enums;

enum SessionType: string
{
    case RealTime = 'real_time';
    case VideoAnalysis = 'video_analysis';
    case WeeklyFollowup = 'weekly_followup';
    case InitialAssessment = 'initial_assessment';

    public function label(): string
    {
        return match ($this) {
            self::RealTime => 'تحليل لحظي',
            self::VideoAnalysis => 'تحليل فيديو',
            self::WeeklyFollowup => 'متابعة أسبوعية',
            self::InitialAssessment => 'تقييم أولي',
        };
    }
}
