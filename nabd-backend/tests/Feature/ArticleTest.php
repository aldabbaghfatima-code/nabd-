<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    public function test_anyone_can_list_published_articles(): void
    {
        Article::factory()->count(3)->create(['is_published' => true]);
        Article::factory()->create(['is_published' => false]);

        $response = $this->getJson('/api/articles');

        $response->assertOk();
    }

    public function test_anyone_can_view_article_by_slug(): void
    {
        $article = Article::factory()->create([
            'is_published' => true,
            'slug' => 'test-article',
        ]);

        $response = $this->getJson('/api/articles/test-article');

        $response->assertOk()
            ->assertJsonPath('title', $article->title);
    }

    public function test_unpublished_article_returns_404(): void
    {
        Article::factory()->create([
            'is_published' => false,
            'slug' => 'draft-article',
        ]);

        $response = $this->getJson('/api/articles/draft-article');

        $response->assertNotFound();
    }

    public function test_admin_can_create_article(): void
    {
        $admin = User::factory()->create(['role' => UserRole::Admin]);
        $token = $admin->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/admin/articles', [
                'title' => 'مقال اختبار',
                'content' => 'محتوى المقال',
            ]);

        $response->assertCreated();
    }

    public function test_non_admin_cannot_create_article(): void
    {
        $therapist = User::factory()->create(['role' => UserRole::Therapist]);
        $token = $therapist->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/admin/articles', [
                'title' => 'مقال اختبار',
                'content' => 'محتوى',
            ]);

        $response->assertForbidden();
    }
}
