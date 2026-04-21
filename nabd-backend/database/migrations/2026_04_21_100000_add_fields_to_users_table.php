<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable()->after('email');
            $table->string('organization', 255)->nullable()->after('phone');
            $table->enum('role', ['admin', 'therapist', 'supervisor', 'guardian'])->default('therapist')->after('organization');
            $table->string('avatar', 500)->nullable()->after('role');
            $table->enum('language', ['ar', 'en'])->default('ar')->after('avatar');
            $table->boolean('dark_mode')->default(false)->after('language');
            $table->boolean('notifications_enabled')->default(true)->after('dark_mode');
            $table->boolean('two_factor_enabled')->default(false)->after('notifications_enabled');
            $table->text('two_factor_secret')->nullable()->after('two_factor_enabled');
            $table->boolean('is_active')->default(true)->after('two_factor_secret');
            $table->timestamp('last_login_at')->nullable()->after('is_active');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone', 'organization', 'role', 'avatar', 'language',
                'dark_mode', 'notifications_enabled', 'two_factor_enabled',
                'two_factor_secret', 'is_active', 'last_login_at', 'deleted_at',
            ]);
        });
    }
};
