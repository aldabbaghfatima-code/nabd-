<?php

namespace Tests\Unit;

use App\Services\ReportService;
use App\Models\Child;
use App\Models\Report;
use App\Models\User;
use App\Enums\UserRole;
use App\Enums\ReportStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportServiceTest extends TestCase
{
    use RefreshDatabase;

    private ReportService $service;
    private User $therapist;
    private Child $child;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new ReportService();
        $this->therapist = User::factory()->create(['role' => UserRole::Therapist]);
        $this->child = Child::factory()->create(['therapist_id' => $this->therapist->id]);
    }

    public function test_get_stats_returns_correct_structure(): void
    {
        $stats = $this->service->getStats($this->therapist);

        $this->assertArrayHasKey('total', $stats);
        $this->assertArrayHasKey('completed', $stats);
        $this->assertArrayHasKey('under_review', $stats);
        $this->assertArrayHasKey('draft', $stats);
    }

    public function test_get_stats_counts_correctly(): void
    {
        Report::factory()->count(3)->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
            'status' => ReportStatus::Completed,
        ]);
        Report::factory()->count(2)->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
            'status' => ReportStatus::Draft,
        ]);

        $stats = $this->service->getStats($this->therapist);

        $this->assertEquals(5, $stats['total']);
        $this->assertEquals(3, $stats['completed']);
        $this->assertEquals(2, $stats['draft']);
    }

    public function test_get_status_distribution_returns_three_statuses(): void
    {
        $distribution = $this->service->getStatusDistribution($this->therapist);

        $this->assertCount(3, $distribution);
        $this->assertEquals('completed', $distribution[0]['status']);
        $this->assertEquals('under_review', $distribution[1]['status']);
        $this->assertEquals('draft', $distribution[2]['status']);
    }

    public function test_generate_from_analysis_creates_report(): void
    {
        $report = $this->service->generateFromAnalysis([
            'child_id' => $this->child->id,
            'title' => 'تقرير اختبار',
            'type' => 'initial_assessment',
        ], $this->therapist);

        $this->assertInstanceOf(Report::class, $report);
        $this->assertEquals('تقرير اختبار', $report->title);
        $this->assertEquals($this->therapist->id, $report->therapist_id);
        $this->assertEquals($this->child->id, $report->child_id);
        $this->assertEquals(ReportStatus::Draft, $report->status);
    }
}
