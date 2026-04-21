<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dashboard_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('therapist_id')->constrained('users')->cascadeOnDelete();
            $table->date('stat_date');
            $table->unsignedInteger('total_children_evaluated')->default(0);
            $table->unsignedInteger('active_sessions')->default(0);
            $table->unsignedInteger('critical_alerts')->default(0);
            $table->unsignedInteger('sessions_count')->default(0);
            $table->decimal('total_revenue', 10, 2)->default(0);
            $table->timestamps();

            $table->unique(['therapist_id', 'stat_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dashboard_stats');
    }
};
