<?php

namespace Database\Seeders;

use App\Models\Bandeira;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BandeiraTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bandeira::factory(10)->create();
    }
}
