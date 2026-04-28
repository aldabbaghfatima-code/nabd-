<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ArticleFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence();

        return [
            'author_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->optional()->paragraph(),
            'content' => fake()->paragraphs(3, true),
            'category' => fake()->optional()->word(),
            'tags' => fake()->optional()->randomElements(['تقنية', 'إرشادي', 'بحث'], 2),
            'is_published' => true,
            'views_count' => fake()->numberBetween(0, 500),
            'published_at' => now(),
        ];
    }
}
