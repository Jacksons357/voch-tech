<?php

namespace Database\Seeders;

use App\Models\GrupoEconomico;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GrupoEconomicoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GrupoEconomico::factory(10)->create();
    }
}
