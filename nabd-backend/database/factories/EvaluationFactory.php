<?php

namespace Database\Factories;

use App\Models\Child;
use App\Models\Evaluation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EvaluationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'therapist_id' => User::factory()->state(['role' => 'therapist']),
            'child_id' => Child::factory(),
            'type' => fake()->randomElement(['تقييم أولي', 'متابعة', 'تقييم سلوكي', 'تقييم نطق']),
            'emotional_status' => fake()->randomElement(['مستقر', 'قلق', 'تحسن', 'فرط نشاط']),
            'status_color' => fake()->randomElement(['success', 'warning', 'danger', 'info']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
