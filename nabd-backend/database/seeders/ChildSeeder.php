<?php

namespace Database\Seeders;

use App\Models\Child;
use Illuminate\Database\Seeder;

class ChildSeeder extends Seeder
{
    public function run(): void
    {
        $therapistId = 2;

        $children = [
            [
                'therapist_id' => $therapistId,
                'name' => 'فهد خالد العمري',
                'age_years' => 5,
                'gender' => 'male',
                'status' => 'under_evaluation',
                'diagnosis' => 'فرط حركة',
                'severity' => 'moderate',
                'photo' => 'https://picsum.photos/seed/child1/200/200',
                'notes' => 'يظهر فرط نشاط ملحوظ مع صعوبة في التركيز لفترات طويلة',
                'total_sessions' => 8,
                'completed_sessions' => 5,
                'treatment_start_date' => '2026-01-15',
            ],
            [
                'therapist_id' => $therapistId,
                'name' => 'سارة جاسم التميمي',
                'age_years' => 4,
                'gender' => 'female',
                'status' => 'evaluation_complete',
                'diagnosis' => 'تأخر نطق',
                'severity' => 'mild',
                'photo' => 'https://picsum.photos/seed/child2/200/200',
                'notes' => 'تأخر في النطق بمعدل سنة عن الأقران، تستجيد للعلاج بشكل ممتاز',
                'total_sessions' => 12,
                'completed_sessions' => 12,
                'treatment_start_date' => '2025-10-01',
            ],
            [
                'therapist_id' => $therapistId,
                'name' => 'يوسف علي المنصور',
                'age_years' => 6,
                'gender' => 'male',
                'status' => 'under_evaluation',
                'diagnosis' => 'توحد - مستوى 1',
                'severity' => 'moderate',
                'photo' => 'https://picsum.photos/seed/child3/200/200',
                'notes' => 'يظهر سمات طيف التوحد المستوى الأول مع صعوبات في التفاعل الاجتماعي',
                'total_sessions' => 15,
                'completed_sessions' => 9,
                'treatment_start_date' => '2025-09-01',
            ],
            [
                'therapist_id' => $therapistId,
                'name' => 'ريان عمر السقاف',
                'age_years' => 8,
                'gender' => 'male',
                'status' => 'evaluation_complete',
                'diagnosis' => 'صعوبات تعلم',
                'severity' => 'mild',
                'photo' => 'https://picsum.photos/seed/child4/200/200',
                'notes' => 'صعوبات في القراءة والكتابة مع ذكاء طبيعي',
                'total_sessions' => 10,
                'completed_sessions' => 10,
                'treatment_start_date' => '2025-11-15',
            ],
        ];

        foreach ($children as $child) {
            Child::create($child);
        }
    }
}
