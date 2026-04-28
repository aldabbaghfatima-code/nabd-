<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name' => 'المجاني',
                'name_en' => 'Free',
                'description' => 'للمعالجين المستقلين - تجربة المنصة',
                'price' => 0,
                'currency' => 'SAR',
                'billing_period' => 'monthly',
                'max_children' => 5,
                'max_sessions_per_month' => 20,
                'features' => ['5 ملفات أطفال', '20 جلسة شهرياً', 'تحليل لحظي أساسي', 'تقارير أساسية'],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'الاحترافي',
                'name_en' => 'Professional',
                'description' => 'للمراكز والعيادات - ميزات متقدمة',
                'price' => 299,
                'currency' => 'SAR',
                'billing_period' => 'monthly',
                'max_children' => 50,
                'max_sessions_per_month' => 200,
                'features' => ['50 ملف طفل', '200 جلسة شهرياً', 'تحليل لحظي وفيديو', 'تقارير متقدمة مع PDF', 'تحليل بالذكاء الاصطناعي', 'دعم فني أولوية'],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'المؤسسي',
                'name_en' => 'Enterprise',
                'description' => 'للمؤسسات والمنظمات الكبيرة',
                'price' => 999,
                'currency' => 'SAR',
                'billing_period' => 'monthly',
                'max_children' => null,
                'max_sessions_per_month' => null,
                'features' => ['ملفات غير محدودة', 'جلسات غير محدودة', 'جميع الميزات المتقدمة', 'API مخصص', 'مدير حساب مخصص', 'تدريب للفريق'],
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($plans as $plan) {
            PricingPlan::create($plan);
        }
    }
}
