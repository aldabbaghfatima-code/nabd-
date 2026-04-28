<?php

namespace Tests\Feature;

use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\Child;
use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use RefreshDatabase;

    private User $therapist;
    private Child $child;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->therapist = User::factory()->create(['role' => UserRole::Therapist]);
        $this->child = Child::factory()->create(['therapist_id' => $this->therapist->id]);
        $this->token = $this->therapist->createToken('test')->plainTextToken;
    }

    public function test_therapist_can_list_reports(): void
    {
        Report::factory()->count(3)->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/reports');

        $response->assertOk();
    }

    public function test_therapist_can_create_report(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->postJson('/api/reports', [
                'child_id' => $this->child->id,
                'title' => 'تقرير اختبار',
                'type' => 'initial_assessment',
            ]);

        $response->assertCreated()
            ->assertJsonPath('report.title', 'تقرير اختبار');
    }

    public function test_therapist_can_view_report(): void
    {
        $report = Report::factory()->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson("/api/reports/{$report->id}");

        $response->assertOk();
    }

    public function test_therapist_can_update_report_status(): void
    {
        $report = Report::factory()->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
            'status' => ReportStatus::Draft,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->putJson("/api/reports/{$report->id}", [
                'status' => 'completed',
            ]);

        $response->assertOk();
    }

    public function test_therapist_can_delete_report(): void
    {
        $report = Report::factory()->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->deleteJson("/api/reports/{$report->id}");

        $response->assertOk();
        $this->assertSoftDeleted('reports', ['id' => $report->id]);
    }

    public function test_report_stats_work(): void
    {
        Report::factory()->count(5)->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/reports/stats');

        $response->assertOk()
            ->assertJsonStructure(['total', 'completed', 'under_review', 'draft']);
    }

    public function test_report_chart_monthly_works(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/reports/chart/monthly');

        $response->assertOk();
    }

    public function test_report_status_distribution_works(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/reports/status-distribution');

        $response->assertOk();
    }
}
