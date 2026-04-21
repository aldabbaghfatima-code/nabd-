<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('analysis_session_id')->nullable()->constrained('analysis_sessions')->nullOnDelete();
            $table->foreignId('session_id')->nullable()->constrained('sessions')->nullOnDelete();
            $table->foreignId('therapist_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('child_id')->constrained('children')->cascadeOnDelete();
            $table->string('title', 500);
            $table->enum('type', ['real_time', 'video_analysis', 'weekly_followup', 'initial_assessment', 'comprehensive']);
            $table->enum('status', ['draft', 'under_review', 'completed'])->default('draft');
            $table->enum('severity', ['low', 'medium', 'high'])->default('medium');
            $table->text('summary')->nullable();
            $table->string('session_duration', 20)->nullable();
            $table->string('emotional_state', 100)->nullable();
            $table->decimal('attention_score', 5, 2)->nullable();
            $table->decimal('vocal_activity_score', 5, 2)->nullable();
            $table->decimal('eye_contact_score', 5, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('therapist_id');
            $table->index('child_id');
            $table->index('status');
            $table->index('type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
