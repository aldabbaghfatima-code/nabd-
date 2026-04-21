<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analysis_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('sessions')->cascadeOnDelete();
            $table->foreignId('child_id')->constrained('children')->cascadeOnDelete();
            $table->foreignId('therapist_id')->constrained('users')->cascadeOnDelete();
            $table->enum('analysis_type', ['real_time', 'video']);
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->unsignedInteger('duration_seconds')->nullable();
            $table->string('video_file_path', 500)->nullable();
            $table->unsignedInteger('video_duration_seconds')->nullable();
            $table->string('video_mime_type', 50)->nullable();
            $table->decimal('attention_score', 5, 2)->nullable();
            $table->decimal('vocal_activity_score', 5, 2)->nullable();
            $table->decimal('eye_contact_score', 5, 2)->nullable();
            $table->decimal('social_interaction_score', 5, 2)->nullable();
            $table->string('emotional_state', 100)->nullable();
            $table->decimal('face_tracking_confidence', 5, 2)->nullable();
            $table->string('ai_model', 100)->default('gemini-2.0-flash-live-001');
            $table->json('ai_raw_response')->nullable();
            $table->unsignedInteger('total_interest_points')->nullable();
            $table->unsignedInteger('total_behavioral_alerts')->nullable();
            $table->timestamps();

            $table->index('session_id');
            $table->index('child_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analysis_sessions');
    }
};
