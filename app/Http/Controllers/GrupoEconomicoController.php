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
        $gruposEconomicos = GrupoEconomico::where('user_id', Auth::id())
            ->withCount('bandeira')
            ->get();

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

    public function edit($id)
    {
        $grupoEconomico = GrupoEconomico::findOrFail($id);
        return Inertia::render('GrupoEconomico/Edit', [
            'grupoEconomico' => $grupoEconomico
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $grupoEconomico = GrupoEconomico::findOrFail($id);
        $grupoEconomico->update([
            'nome' => $validatedData['nome'],
        ]);

        return redirect()->route('grupos-economicos.index')
            ->with('success', 'Grupo econômico atualizado com sucesso.');
    }

    public function destroy($id)
    {
        $grupoEconomico = GrupoEconomico::findOrFail($id);

        if ($grupoEconomico->user_id !== Auth::id()) {
            abort(403, 'Não autorizado');
        }

        $grupoEconomico->delete();

        return redirect()->route('grupos-economicos.index')
            ->with('success', 'Grupo com sucesso.');
    }
}
