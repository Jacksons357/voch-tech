<?php

namespace Database\Factories;

use App\Models\Bandeira;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unidade>
 */
class UnidadeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome_fantasia' => $this->faker->name(),
            'razao_social' => $this->faker->name(),
            'cnpj' => '20.232.992/0002-81',
            'bandeira_id' => Bandeira::all()->random()->id,
            'user_id' => User::all()->random()->id,
        ];
    }
}
