<?php

namespace Database\Seeders;

use App\Models\Colaborador;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColaboradorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Colaborador::factory(50)->create();
    }
}
