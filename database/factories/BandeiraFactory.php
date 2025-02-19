<?php

namespace Database\Factories;

use App\Models\GrupoEconomico;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Auth;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bandeira>
 */
class BandeiraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => 'american express',
            'grupo_economico_id' => GrupoEconomico::all()->random()->id,
            'user_id' => User::all()->random()->id
        ];
    }
}
