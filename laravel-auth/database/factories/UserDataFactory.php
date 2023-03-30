<?php

namespace Database\Factories;

use App\Models\UserData;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserDataFactory extends Factory
{
    protected $model = UserData::class;

    public function definition()
    {
        return [
            'client_id' => $this->faker->unique()->randomNumber(5),
            'client_name' => $this->faker->name(),
            'client_email' => $this->faker->email(),
            'title' => $this->faker->sentence(),
            'message' => $this->faker->paragraph(),
            'file_link' => $this->faker->imageUrl(),
        ];
    }
}