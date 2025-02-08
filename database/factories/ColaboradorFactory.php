<?php

namespace Database\Factories;

use App\Models\Unidade;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Colaborador>
 */
class ColaboradorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name(),
            'email' => $this->faker->email(),
            'cpf' => $this->faker->numerify('###.###.###-##'),
            'unidade_id' => Unidade::all()->random()->id,
            'user_id' => User::all()->random()->id,
        ];
    }
}
