<?php

namespace Tests\Unit;

use App\Services\DashboardService;
use App\Models\Child;
use App\Models\Session;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardServiceTest extends TestCase
{
    use RefreshDatabase;

    private DashboardService $service;
    private User $therapist;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new DashboardService();
        $this->therapist = User::factory()->create(['role' => UserRole::Therapist]);
    }

    public function test_calculate_stats_returns_correct_structure(): void
    {
        $stats = $this->service->calculateStats($this->therapist);

        $this->assertArrayHasKey('total_children', $stats);
        $this->assertArrayHasKey('under_evaluation', $stats);
        $this->assertArrayHasKey('active_sessions', $stats);
        $this->assertArrayHasKey('total_sessions', $stats);
        $this->assertArrayHasKey('completed_sessions', $stats);
        $this->assertArrayHasKey('total_reports', $stats);
        $this->assertArrayHasKey('critical_alerts', $stats);
        $this->assertArrayHasKey('today_sessions', $stats);
        $this->assertArrayHasKey('total_revenue', $stats);
    }

    public function test_calculate_stats_counts_children(): void
    {
        Child::factory()->count(5)->create(['therapist_id' => $this->therapist->id]);

        $stats = $this->service->calculateStats($this->therapist);

        $this->assertEquals(5, $stats['total_children']);
    }

    public function test_weekly_data_returns_seven_days(): void
    {
        $data = $this->service->getWeeklyData($this->therapist);

        $this->assertCount(7, $data);
        $this->assertArrayHasKey('day', $data[0]);
        $this->assertArrayHasKey('sessions', $data[0]);
    }

    public function test_monthly_data_returns_twelve_months(): void
    {
        $data = $this->service->getMonthlyData($this->therapist);

        $this->assertCount(12, $data);
        $this->assertArrayHasKey('month', $data[0]);
        $this->assertArrayHasKey('sessions', $data[0]);
    }
}
