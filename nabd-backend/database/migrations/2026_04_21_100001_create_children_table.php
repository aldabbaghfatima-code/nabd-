<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('children', function (Blueprint $table) {
            $table->id();
            $table->foreignId('therapist_id')->constrained('users')->cascadeOnDelete();
            $table->string('name');
            $table->unsignedTinyInteger('age_years');
            $table->enum('gender', ['male', 'female']);
            $table->enum('status', ['under_evaluation', 'evaluation_complete'])->default('under_evaluation');
            $table->string('diagnosis', 255)->nullable();
            $table->enum('severity', ['mild', 'moderate', 'severe'])->default('mild');
            $table->string('photo', 500)->nullable();
            $table->text('notes')->nullable();
            $table->unsignedInteger('total_sessions')->default(0);
            $table->unsignedInteger('completed_sessions')->default(0);
            $table->date('treatment_start_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('therapist_id');
            $table->index('status');
            $table->index('severity');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('children');
    }
};
