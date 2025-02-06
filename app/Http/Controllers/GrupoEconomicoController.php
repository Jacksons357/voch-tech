<?php

namespace App\Http\Controllers;

use App\Models\GrupoEconomico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GrupoEconomicoController extends Controller
{
    public function index()
    {
        $gruposEconomicos = GrupoEconomico::where('user_id', Auth::id())->get();

        return Inertia::render('GrupoEconomico/Index', [
            'gruposEconomicos' => $gruposEconomicos
        ]);
    }

    public function create()
    {
        return Inertia::render('GrupoEconomico/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        GrupoEconomico::create([
            'nome' => $validatedData['nome'],
            'user_id' => Auth::id()
        ]);

        return redirect()->route('grupos-economicos.index')
            ->with('success', 'Grupo econômico criado com sucesso.');
    }
}
