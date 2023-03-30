<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserData;

class UserDataSeeder extends Seeder
{
    public function run()
    {
        UserData::factory()->count(500)->create();
    }
}