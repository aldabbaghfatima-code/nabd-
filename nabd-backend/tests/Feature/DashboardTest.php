<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\Child;
use App\Models\Evaluation;
use App\Models\Session;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    private User $therapist;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->therapist = User::factory()->create(['role' => UserRole::Therapist]);
        $this->token = $this->therapist->createToken('test')->plainTextToken;
    }

    public function test_dashboard_stats_work(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/dashboard/stats');

        $response->assertOk()
            ->assertJsonStructure([
                'total_children', 'under_evaluation', 'active_sessions',
                'total_sessions', 'completed_sessions', 'total_reports',
                'critical_alerts', 'today_sessions', 'total_revenue',
            ]);
    }

    public function test_dashboard_chart_weekly_works(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/dashboard/chart/weekly');

        $response->assertOk();
    }

    public function test_dashboard_chart_monthly_works(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/dashboard/chart/monthly');

        $response->assertOk();
    }

    public function test_dashboard_evaluations_work(): void
    {
        $child = Child::factory()->create(['therapist_id' => $this->therapist->id]);
        Evaluation::factory()->count(3)->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $child->id,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/dashboard/evaluations');

        $response->assertOk();
    }

    public function test_dashboard_upcoming_sessions_work(): void
    {
        $child = Child::factory()->create(['therapist_id' => $this->therapist->id]);
        Session::factory()->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $child->id,
            'scheduled_date' => now()->addDay(),
            'status' => 'scheduled',
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/dashboard/upcoming-sessions');

        $response->assertOk();
    }
}
