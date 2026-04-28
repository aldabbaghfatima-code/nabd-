<?php

namespace Database\Seeders;

use App\Models\Evaluation;
use Illuminate\Database\Seeder;

class EvaluationSeeder extends Seeder
{
    public function run(): void
    {
        $therapistId = 2;

        $evaluations = [
            ['therapist_id' => $therapistId, 'child_id' => 1, 'session_id' => 1, 'type' => 'تقييم أولي', 'emotional_status' => 'قلق', 'status_color' => 'warning', 'notes' => 'يظهر قلق ملحوظ عند البدء'],
            ['therapist_id' => $therapistId, 'child_id' => 1, 'session_id' => null, 'type' => 'متابعة', 'emotional_status' => 'تحسن', 'status_color' => 'success', 'notes' => 'تحسن ملحوظ في الجلسة الأخيرة'],
            ['therapist_id' => $therapistId, 'child_id' => 2, 'session_id' => 2, 'type' => 'تقييم نطق', 'emotional_status' => 'مستقر', 'status_color' => 'success', 'notes' => 'تقدم ممتاز في النطق'],
            ['therapist_id' => $therapistId, 'child_id' => 2, 'session_id' => null, 'type' => 'متابعة شهرية', 'emotional_status' => 'مستقر', 'status_color' => 'success', 'notes' => 'حالة مستقرة مع تقدم مستمر'],
            ['therapist_id' => $therapistId, 'child_id' => 3, 'session_id' => 3, 'type' => 'تقييم سلوكي', 'emotional_status' => 'انطواء', 'status_color' => 'warning', 'notes' => 'يميل للعزلة في بداية الجلسة'],
            ['therapist_id' => $therapistId, 'child_id' => 3, 'session_id' => null, 'type' => 'متابعة', 'emotional_status' => 'تحسن طفيف', 'status_color' => 'info', 'notes' => 'بدأ بالتفاعل أكثر مع المعالج'],
            ['therapist_id' => $therapistId, 'child_id' => 4, 'session_id' => null, 'type' => 'تقييم تعلم', 'emotional_status' => 'محبط', 'status_color' => 'warning', 'notes' => 'يظهر إحباط عند مواجهة صعوبات'],
            ['therapist_id' => $therapistId, 'child_id' => 4, 'session_id' => null, 'type' => 'متابعة', 'emotional_status' => 'تحسن', 'status_color' => 'success', 'notes' => 'تحسن في التعامل مع الإحباط'],
            ['therapist_id' => $therapistId, 'child_id' => 1, 'session_id' => null, 'type' => 'تقييم سلوكي', 'emotional_status' => 'فرط نشاط', 'status_color' => 'danger', 'notes' => 'نشاط زائد مع صعوبة في الهدوء'],
            ['therapist_id' => $therapistId, 'child_id' => 3, 'session_id' => null, 'type' => 'تقييم تواصل', 'emotional_status' => 'تحسن', 'status_color' => 'success', 'notes' => 'بدأ بالتواصل البصري بشكل أفضل'],
        ];

        foreach ($evaluations as $evaluation) {
            Evaluation::create($evaluation);
        }
    }
}
