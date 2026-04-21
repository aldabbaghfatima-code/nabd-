<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('report_recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
            $table->text('text');
            $table->unsignedInteger('priority')->default(0);
            $table->timestamp('created_at');

            $table->index('report_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('report_recommendations');
    }
};
