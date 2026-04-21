<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('therapist_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('child_id')->constrained('children')->cascadeOnDelete();
            $table->foreignId('session_id')->nullable()->constrained('sessions')->nullOnDelete();
            $table->string('type', 100);
            $table->string('emotional_status', 100);
            $table->string('status_color', 50)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('therapist_id');
            $table->index('child_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
