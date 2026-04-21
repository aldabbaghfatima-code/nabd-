<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('voice_analysis_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('analysis_session_id')->constrained('analysis_sessions')->cascadeOnDelete();
            $table->unsignedInteger('timestamp_seconds');
            $table->string('timestamp_display', 20)->nullable();
            $table->decimal('intensity_value', 5, 2);
            $table->enum('tone_type', ['calm', 'tension', 'neutral', 'happy', 'sad', 'angry'])->default('neutral');
            $table->timestamp('created_at');

            $table->index('analysis_session_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('voice_analysis_data');
    }
};
