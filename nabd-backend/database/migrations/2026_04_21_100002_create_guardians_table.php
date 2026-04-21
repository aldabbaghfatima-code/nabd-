<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained('children')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('name');
            $table->string('phone', 20)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('relationship', 50)->nullable();
            $table->timestamps();

            $table->index('child_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guardians');
    }
};
