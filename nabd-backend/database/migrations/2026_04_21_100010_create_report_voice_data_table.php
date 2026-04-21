<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('report_voice_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
            $table->string('time', 20);
            $table->decimal('value', 5, 2);
            $table->timestamp('created_at');

            $table->index('report_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('report_voice_data');
    }
};
