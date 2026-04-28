<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ChildSeeder::class,
            GuardianSeeder::class,
            SessionSeeder::class,
            EvaluationSeeder::class,
            ReportSeeder::class,
            ArticleSeeder::class,
            PricingPlanSeeder::class,
        ]);
    }
}
