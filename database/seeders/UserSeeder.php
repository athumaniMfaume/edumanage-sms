<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Athumani Mfaume',
            'tenant_id' => '1',
            'email' => 'athumanimfaume1995@gmail.com',
            'password' => '12345678',
        ]);
    }
}
