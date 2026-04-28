<?php

namespace Database\Seeders;

use App\Enums\SessionStatus;
use App\Enums\SessionType;
use App\Models\Session;
use Illuminate\Database\Seeder;

class SessionSeeder extends Seeder
{
    public function run(): void
    {
        $therapistId = 2;

        $sessions = [
            [
                'therapist_id' => $therapistId,
                'child_id' => 1,
                'type' => SessionType::InitialAssessment,
                'status' => SessionStatus::Completed,
                'scheduled_date' => '2026-04-20',
                'scheduled_time' => '09:00',
                'duration_minutes' => 45,
                'amount' => 200,
                'notes' => 'تقييم أولي شامل',
            ],
            [
                'therapist_id' => $therapistId,
                'child_id' => 2,
                'type' => SessionType::RealTime,
                'status' => SessionStatus::Completed,
                'scheduled_date' => '2026-04-21',
                'scheduled_time' => '10:30',
                'duration_minutes' => 30,
                'amount' => 150,
                'notes' => 'جلسة تحليل لحظي',
            ],
            [
                'therapist_id' => $therapistId,
                'child_id' => 3,
                'type' => SessionType::VideoAnalysis,
                'status' => SessionStatus::Completed,
                'scheduled_date' => '2026-04-22',
                'scheduled_time' => '12:00',
                'duration_minutes' => 60,
                'amount' => 250,
                'notes' => 'تحليل فيديو مسجل',
            ],
            [
                'therapist_id' => $therapistId,
                'child_id' => 1,
                'type' => SessionType::WeeklyFollowup,
                'status' => SessionStatus::Scheduled,
                'scheduled_date' => '2026-04-29',
                'scheduled_time' => '09:00',
                'duration_minutes' => 30,
                'amount' => 150,
                'notes' => 'متابعة أسبوعية',
            ],
            [
                'therapist_id' => $therapistId,
                'child_id' => 4,
                'type' => SessionType::WeeklyFollowup,
                'status' => SessionStatus::InProgress,
                'scheduled_date' => '2026-04-28',
                'scheduled_time' => '14:00',
                'duration_minutes' => 30,
                'amount' => 150,
                'notes' => 'متابعة أسبوعية - جارية',
            ],
        ];

        foreach ($sessions as $session) {
            Session::create($session);
        }
    }
}
