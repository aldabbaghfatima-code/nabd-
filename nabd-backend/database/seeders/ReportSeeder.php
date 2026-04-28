<?php

namespace Database\Seeders;

use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\ReportNote;
use App\Models\ReportRecommendation;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    public function run(): void
    {
        $therapistId = 2;

        $reports = [
            [
                'therapist_id' => $therapistId, 'child_id' => 1, 'session_id' => 1,
                'title' => 'تقرير التقييم الأولي - فهد العمري', 'type' => 'initial_assessment',
                'status' => ReportStatus::Completed, 'severity' => 'medium',
                'summary' => 'تقييم أولي شامل للطفل فهد أظهر فرط نشاط مع قلق ملحوظ',
                'emotional_state' => 'قلق', 'attention_score' => 45, 'vocal_activity_score' => 70,
                'eye_contact_score' => 55, 'session_duration' => '00:45:00',
            ],
            [
                'therapist_id' => $therapistId, 'child_id' => 2, 'session_id' => 2,
                'title' => 'تقرير تحليل لحظي - سارة التميمي', 'type' => 'real_time',
                'status' => ReportStatus::Completed, 'severity' => 'low',
                'summary' => 'تحليل لحظي أظهر استقراراً عاطفياً مع تقدم في النطق',
                'emotional_state' => 'مستقر', 'attention_score' => 75, 'vocal_activity_score' => 65,
                'eye_contact_score' => 80, 'session_duration' => '00:30:00',
            ],
            [
                'therapist_id' => $therapistId, 'child_id' => 3, 'session_id' => 3,
                'title' => 'تقرير تحليل الفيديو - يوسف المنصور', 'type' => 'video_analysis',
                'status' => ReportStatus::UnderReview, 'severity' => 'medium',
                'summary' => 'تحليل فيديو أظهر انطواء مع تحسن تدريجي في التفاعل',
                'emotional_state' => 'انطواء', 'attention_score' => 50, 'vocal_activity_score' => 35,
                'eye_contact_score' => 40, 'session_duration' => '01:00:00',
            ],
            [
                'therapist_id' => $therapistId, 'child_id' => 1, 'session_id' => null,
                'title' => 'متابعة أسبوعية - فهد العمري', 'type' => 'weekly_followup',
                'status' => ReportStatus::Completed, 'severity' => 'low',
                'summary' => 'تحسن ملحوظ في مستوى التركيز',
                'emotional_state' => 'تحسن', 'attention_score' => 60, 'vocal_activity_score' => 65,
                'eye_contact_score' => 65, 'session_duration' => '00:30:00',
            ],
            [
                'therapist_id' => $therapistId, 'child_id' => 4, 'session_id' => null,
                'title' => 'تقييم صعوبات التعلم - ريان السقاف', 'type' => 'comprehensive',
                'status' => ReportStatus::Draft, 'severity' => 'low',
                'summary' => 'تقييم شامل لصعوبات التعلم مع توصيات علاجية',
                'emotional_state' => 'محبط', 'attention_score' => 55, 'vocal_activity_score' => 60,
                'eye_contact_score' => 70, 'session_duration' => null,
            ],
            [
                'therapist_id' => $therapistId, 'child_id' => 3, 'session_id' => null,
                'title' => 'متابعة شهرية - يوسف المنصور', 'type' => 'weekly_followup',
                'status' => ReportStatus::UnderReview, 'severity' => 'medium',
                'summary' => 'متابعة شهرية مع تحليل التقدم',
                'emotional_state' => 'تحسن طفيف', 'attention_score' => 55, 'vocal_activity_score' => 45,
                'eye_contact_score' => 50, 'session_duration' => '00:30:00',
            ],
        ];

        foreach ($reports as $report) {
            $r = Report::create($report);

            ReportNote::create(['report_id' => $r->id, 'time' => '00:05', 'type' => 'behavioral', 'text' => 'بدأ الجلسة بهدوء نسبي', 'status' => 'info']);
            ReportNote::create(['report_id' => $r->id, 'time' => '00:15', 'type' => 'emotional', 'text' => 'تحسن في التواصل البصري', 'status' => 'positive']);

            ReportRecommendation::create(['report_id' => $r->id, 'text' => 'الاستمرار في جلسات العلاج بالنطق', 'priority' => 1]);
            ReportRecommendation::create(['report_id' => $r->id, 'text' => 'زيادة وقت اللعب التفاعلي', 'priority' => 2]);
        }
    }
}
