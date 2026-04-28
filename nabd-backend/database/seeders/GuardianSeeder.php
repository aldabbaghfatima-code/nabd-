<?php

namespace Database\Seeders;

use App\Models\Guardian;
use Illuminate\Database\Seeder;

class GuardianSeeder extends Seeder
{
    public function run(): void
    {
        $guardians = [
            ['child_id' => 1, 'name' => 'خالد العمري', 'phone' => '0501234567', 'email' => 'khalid@example.com', 'relationship' => 'أب'],
            ['child_id' => 2, 'name' => 'فاطمة التميمي', 'phone' => '0502345678', 'email' => 'fatima@example.com', 'relationship' => 'أم'],
            ['child_id' => 3, 'name' => 'علي المنصور', 'phone' => '0503456789', 'email' => 'ali@example.com', 'relationship' => 'أب'],
            ['child_id' => 4, 'name' => 'عمر السقاف', 'phone' => '0504567890', 'email' => 'omar@example.com', 'relationship' => 'أب'],
        ];

        foreach ($guardians as $guardian) {
            Guardian::create($guardian);
        }
    }
}
