<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('therapist_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('child_id')->constrained('children')->cascadeOnDelete();
            $table->enum('type', ['real_time', 'video_analysis', 'weekly_followup', 'initial_assessment']);
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled'])->default('scheduled');
            $table->date('scheduled_date');
            $table->time('scheduled_time');
            $table->unsignedInteger('duration_minutes')->nullable();
            $table->decimal('amount', 10, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['therapist_id', 'scheduled_date']);
            $table->index('child_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
