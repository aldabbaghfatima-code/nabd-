<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\Child;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChildTest extends TestCase
{
    use RefreshDatabase;

    private User $therapist;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->therapist = User::factory()->create([
            'role' => UserRole::Therapist,
        ]);
        $this->token = $this->therapist->createToken('test')->plainTextToken;
    }

    public function test_therapist_can_list_children(): void
    {
        Child::factory()->count(3)->create(['therapist_id' => $this->therapist->id]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/children');

        $response->assertOk()
            ->assertJsonStructure(['data']);
    }

    public function test_therapist_can_create_child(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->postJson('/api/children', [
                'name' => 'أحمد محمد',
                'age_years' => 5,
                'gender' => 'male',
                'guardian_name' => 'محمد',
            ]);

        $response->assertCreated()
            ->assertJsonPath('child.name', 'أحمد محمد');

        $this->assertDatabaseHas('children', ['name' => 'أحمد محمد']);
        $this->assertDatabaseHas('guardians', ['name' => 'محمد']);
    }

    public function test_create_child_validates_required_fields(): void
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->postJson('/api/children', []);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'age_years', 'gender', 'guardian_name']);
    }

    public function test_therapist_can_view_child(): void
    {
        $child = Child::factory()->create(['therapist_id' => $this->therapist->id]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson("/api/children/{$child->id}");

        $response->assertOk()
            ->assertJsonPath('id', $child->id);
    }

    public function test_therapist_can_update_child(): void
    {
        $child = Child::factory()->create(['therapist_id' => $this->therapist->id]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->putJson("/api/children/{$child->id}", [
                'name' => 'اسم محدث',
            ]);

        $response->assertOk();
        $this->assertEquals('اسم محدث', $child->fresh()->name);
    }

    public function test_therapist_can_delete_child(): void
    {
        $child = Child::factory()->create(['therapist_id' => $this->therapist->id]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->deleteJson("/api/children/{$child->id}");

        $response->assertOk();
        $this->assertSoftDeleted('children', ['id' => $child->id]);
    }

    public function test_therapist_cannot_view_other_therapist_child(): void
    {
        $otherTherapist = User::factory()->create(['role' => UserRole::Therapist]);
        $child = Child::factory()->create(['therapist_id' => $otherTherapist->id]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson("/api/children/{$child->id}");

        $response->assertForbidden();
    }

    public function test_children_search_works(): void
    {
        Child::factory()->create(['therapist_id' => $this->therapist->id, 'name' => 'فهد']);
        Child::factory()->create(['therapist_id' => $this->therapist->id, 'name' => 'سارة']);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/children?search=فهد');

        $response->assertOk();
        $data = $response->json('data');
        $this->assertCount(1, $data);
    }

    public function test_children_stats_work(): void
    {
        Child::factory()->count(3)->create([
            'therapist_id' => $this->therapist->id,
            'status' => 'under_evaluation',
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->token}")
            ->getJson('/api/children/stats');

        $response->assertOk()
            ->assertJsonPath('total', 3)
            ->assertJsonPath('under_evaluation', 3);
    }
}
