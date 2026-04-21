<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analysis_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('analysis_session_id')->constrained('analysis_sessions')->cascadeOnDelete();
            $table->unsignedInteger('timestamp_seconds')->nullable();
            $table->string('timestamp_display', 20)->nullable();
            $table->string('type', 100);
            $table->text('text');
            $table->enum('status', ['positive', 'warning', 'info'])->default('info');
            $table->enum('source', ['ai', 'therapist'])->default('therapist');
            $table->timestamps();

            $table->index('analysis_session_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analysis_notes');
    }
};
