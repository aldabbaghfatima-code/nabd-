<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'مدير النظام',
            'email' => 'admin@nabd.com',
            'password' => Hash::make('password'),
            'role' => UserRole::Admin,
            'phone' => '0500000001',
            'is_active' => true,
        ]);

        User::create([
            'name' => 'د. سارة الأحمد',
            'email' => 'dr.sara@nabd.com',
            'password' => Hash::make('password'),
            'role' => UserRole::Therapist,
            'phone' => '0500000002',
            'organization' => 'مركز نبض للعلاج النفسي',
            'avatar' => 'https://picsum.photos/seed/doctor/100/100',
            'is_active' => true,
        ]);

        User::create([
            'name' => 'أحمد المشرف',
            'email' => 'supervisor@nabd.com',
            'password' => Hash::make('password'),
            'role' => UserRole::Supervisor,
            'phone' => '0500000003',
            'is_active' => true,
        ]);
    }
}
