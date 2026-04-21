<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('report_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
            $table->string('time', 20)->nullable();
            $table->string('type', 100);
            $table->text('text');
            $table->enum('status', ['positive', 'warning', 'info'])->default('info');
            $table->timestamps();

            $table->index('report_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('report_notes');
    }
};
