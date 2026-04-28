<?php

namespace Database\Factories;

use App\Models\Child;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChildFactory extends Factory
{
    public function definition(): array
    {
        return [
            'therapist_id' => User::factory()->state(['role' => UserRole::Therapist]),
            'name' => fake()->name(),
            'age_years' => fake()->numberBetween(3, 12),
            'gender' => fake()->randomElement(['male', 'female']),
            'status' => fake()->randomElement(['under_evaluation', 'evaluation_complete']),
            'diagnosis' => fake()->optional()->word(),
            'severity' => fake()->randomElement(['mild', 'moderate', 'severe']),
            'notes' => fake()->optional()->sentence(),
            'total_sessions' => fake()->numberBetween(0, 20),
            'completed_sessions' => fake()->numberBetween(0, 15),
            'treatment_start_date' => fake()->optional()->date(),
        ];
    }
}
