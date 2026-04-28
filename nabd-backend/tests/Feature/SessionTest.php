<?php

namespace Tests\Feature;

use App\Enums\SessionStatus;
use App\Enums\UserRole;
use App\Models\Child;
use App\Models\Session;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SessionTest extends TestCase
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

    public function test_therapist_can_list_sessions(): void
    {
        Session::factory()->count(3)->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/sessions');

        $response->assertOk();
    }

    public function test_therapist_can_create_session(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->postJson('/api/sessions', [
                'child_id' => $this->child->id,
                'type' => 'real_time',
                'scheduled_date' => '2026-05-01',
                'scheduled_time' => '09:00',
            ]);

        $response->assertCreated()
            ->assertJsonPath('session.child_id', $this->child->id);
    }

    public function test_therapist_can_start_session(): void
    {
        $session = Session::factory()->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
            'status' => SessionStatus::Scheduled,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->postJson("/api/sessions/{$session->id}/start");

        $response->assertOk();
        $this->assertEquals(SessionStatus::InProgress->value, $session->fresh()->status->value);
    }

    public function test_therapist_can_end_session(): void
    {
        $session = Session::factory()->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
            'status' => SessionStatus::InProgress,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->postJson("/api/sessions/{$session->id}/end", [
                'duration_minutes' => 45,
            ]);

        $response->assertOk();
        $this->assertEquals(SessionStatus::Completed->value, $session->fresh()->status->value);
        $this->assertEquals(45, $session->fresh()->duration_minutes);
    }

    public function test_therapist_can_delete_session(): void
    {
        $session = Session::factory()->create([
            'therapist_id' => $this->therapist->id,
            'child_id' => $this->child->id,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->deleteJson("/api/sessions/{$session->id}");

        $response->assertOk();
        $this->assertSoftDeleted('sessions', ['id' => $session->id]);
    }
}
