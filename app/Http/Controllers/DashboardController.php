<?php

namespace App\Http\Controllers;

use App\Models\Bandeira;
use App\Models\Colaborador;
use App\Models\GrupoEconomico;
use App\Models\Unidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $gruposEconomicos = GrupoEconomico::where('user_id', Auth::id())->get();

        $bandeiras = Bandeira::where('user_id', Auth::id())->get();

        $unidades = Unidade::where('user_id', Auth::id())->get();

        $colaboradores = Colaborador::where('user_id', Auth::id())->get();

        return Inertia::render('Dashboard', [
            'data' => [
                'gruposEconomicos' => $gruposEconomicos,
                'bandeiras' => $bandeiras,
                'unidades' => $unidades,
                'colaboradores' => $colaboradores

            ],
        ]);
    }
}
