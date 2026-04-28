<?php

namespace Database\Factories;

use App\Enums\ReportStatus;
use App\Models\Child;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReportFactory extends Factory
{
    public function definition(): array
    {
        return [
            'therapist_id' => User::factory()->state(['role' => 'therapist']),
            'child_id' => Child::factory(),
            'title' => fake()->sentence(),
            'type' => fake()->randomElement(['real_time', 'video_analysis', 'weekly_followup', 'initial_assessment', 'comprehensive']),
            'status' => fake()->randomElement(ReportStatus::cases()),
            'severity' => fake()->randomElement(['low', 'medium', 'high']),
            'summary' => fake()->optional()->paragraph(),
            'emotional_state' => fake()->optional()->word(),
            'attention_score' => fake()->optional()->randomFloat(2, 0, 100),
            'vocal_activity_score' => fake()->optional()->randomFloat(2, 0, 100),
            'eye_contact_score' => fake()->optional()->randomFloat(2, 0, 100),
        ];
    }
}
