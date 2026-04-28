<?php

namespace Database\Factories;

use App\Enums\SessionStatus;
use App\Enums\SessionType;
use App\Models\Child;
use App\Models\Session;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SessionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'therapist_id' => User::factory()->state(['role' => 'therapist']),
            'child_id' => Child::factory(),
            'type' => fake()->randomElement(SessionType::cases()),
            'status' => fake()->randomElement(SessionStatus::cases()),
            'scheduled_date' => fake()->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d'),
            'scheduled_time' => fake()->time('H:i'),
            'duration_minutes' => fake()->optional()->numberBetween(15, 90),
            'amount' => fake()->randomFloat(2, 0, 500),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
