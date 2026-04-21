<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->constrained('users')->cascadeOnDelete();
            $table->string('title', 500);
            $table->string('slug', 500)->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('cover_image', 500)->nullable();
            $table->string('category', 100)->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_published')->default(false);
            $table->unsignedInteger('views_count')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('author_id');
            $table->index('is_published');
            $table->index('slug');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
